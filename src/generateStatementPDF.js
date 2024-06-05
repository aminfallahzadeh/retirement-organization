// library imports
import { PDFDocument, TextAlignment } from "pdf-lib";
import { saveAs } from "file-saver";
import fontkit from "@pdf-lib/fontkit";

// helpers
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
  separateByThousands,
  reverseString,
} from "./helper";

// -------------------------------------------------------------
export const createStatementPDF = async (retired, statement, isDead) => {
  const url = isDead
    ? "./pdfs/heir-placeholder.pdf"
    : "./pdfs/related-placeholder.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  pdfDoc.registerFontkit(fontkit);
  const fontUrl = `./fonts/Vazir.ttf`;

  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const form = pdfDoc.getForm();

  // HADNLE STATEMENT ITEMS
  const statementItems = {};
  const idKey = "retirementStatementItemID";
  const amountKey = "retirementStatementItemAmount";
  const searchValues = {
    first: "1001",
    second: "1002",
    third: "1003",
    forth: "1004",
  };
  const newKeys = {
    first: "basicSalary",
    second: "suplementaryPension",
    third: "childAllowance",
    forth: "familyAllowance",
  };
  const findAndAssign = (arr, target, key, itemKey, searchValues, newKeys) => {
    arr.forEach((obj) => {
      Object.keys(searchValues).forEach((i) => {
        if (obj[key] === searchValues[i]) {
          target[newKeys[i]] = String(obj[itemKey]);
        }
      });
    });
  };

  // GENERATE STATEMENT ITEMS
  findAndAssign(
    statement.retirementStatementAmountList,
    statementItems,
    idKey,
    amountKey,
    searchValues,
    newKeys
  );

  const fields = {
    personNationalCode:
      retired.personNationalCode === null
        ? "-"
        : reverseString(convertToPersianNumber(retired.personNationalCode)),
    personLastName: retired.personLastName || "-",
    personFirstName: retired.personFirstName || "-",
    retiredID: retired.retiredID || "-",
    personCertificateNo:
      convertToPersianNumber(retired.personCertificateNo) ?? "-",
    personFatherName: retired.personFatherName || "-",
    personBirthDate:
      convertToPersianDateFormatted(retired.personBirthDate) ?? "-",
    personBirthPlace: retired.personBirthPlace || "-",
    gender: retired.genderName || "-",
    retirementStatementChildrenCount:
      reverseString(
        convertToPersianNumber(statement.retirementStatementChildrenCount)
      ) ?? "-",
    insuranceCode: convertToPersianNumber(retired.insuranceCode) ?? "-",
    relatedCount:
      convertToPersianNumber(statement.retirementStatementRelatedCount) ?? "-",
    maritialStatus: retired.maritialStatus || "-",
    personPostalCode: convertToPersianNumber(retired.personPostalCode) || "-",
    retirementStatementSerial:
      reverseString(
        convertToPersianNumber(statement.retirementStatementSerial)
      ) ?? "-",
    retirementDate:
      reverseString(convertToPersianDateFormatted(retired.retirementDate)) ??
      "-",
    retiredLastPosition: retired.retiredLastPosition || "-",
    retiredRealDuration:
      reverseString(
        separateByThousands(convertToPersianNumber(retired.retiredRealDuration))
      ) ?? "-",
    retiredGrantDuration:
      reverseString(
        separateByThousands(
          convertToPersianNumber(retired.retiredGrantDuration)
        )
      ) ?? "-",
    retiredGroup:
      reverseString(
        separateByThousands(
          convertToPersianNumber(retired.retiredGrandDuration)
        )
      ) ?? "-",
    retiredJobDegree:
      reverseString(
        separateByThousands(
          convertToPersianNumber(retired.retiredGrandDuration)
        )
      ) ?? "-",
    educationTypeName: retired.educationTypeName || "-",
    retirementStatementTypeName: statement.retirementStatementTypeName || "-",
    personDeathDate:
      retired.personDeathDate === null
        ? "-"
        : reverseString(convertToPersianDateFormatted(retired.personDeathDate)),
    retirementStatementDesc: statement.retirementStatementDesc || "-",
    retirementStatementRunDate:
      reverseString(
        convertToPersianDateFormatted(statement.retirementStatementRunDate)
      ) || "-",
    retirementStatementIssueDate:
      reverseString(
        convertToPersianDateFormatted(statement.retirementStatementIssueDate)
      ) || "-",
    retirementStatementNo:
      reverseString(
        separateByThousands(
          convertToPersianNumber(statement.retirementStatementNo)
        )
      ) ?? "-",
    basicSalary: statementItems.basicSalary
      ? reverseString(
          separateByThousands(
            convertToPersianNumber(statementItems.basicSalary)
          )
        )
      : "-",

    supplementaryPension: statementItems.suplementaryPension
      ? reverseString(
          separateByThousands(
            convertToPersianNumber(statementItems.suplementaryPension)
          )
        )
      : "-",

    familyAllowance: statementItems.familyAllowance
      ? reverseString(
          separateByThousands(
            convertToPersianNumber(statementItems.familyAllowance)
          )
        )
      : "-",

    childAllowance: statementItems.childAllowance
      ? reverseString(
          separateByThousands(
            convertToPersianNumber(statementItems.childAllowance)
          )
        )
      : "-",

    totalAmount:
      statement.sumRetirementStatementAmount === null
        ? "-"
        : reverseString(
            separateByThousands(
              convertToPersianNumber(statement.sumRetirementStatementAmount)
            )
          ),
  };

  const checkboxes = {
    personIsSacrificedFamily: retired.personIsSacrificedFamily || false,
    personIsValiant: retired.personIsValiant || false,
    personIsCaptive: retired.personIsCaptive || false,
    personIsWarrior: retired.personIsWarrior || false,
    personIsSacrificed: retired.personIsSacrificed || false,
    personIsChildOfSacrificed: retired.personIsChildOfSacrificed || false,
  };

  const table = statement.retirementStatementRelatedList.map(
    (related, index) => {
      const commonFields = {
        [`rowNum-${index}`]: convertToPersianNumber(index + 1),
        [`nationalCode-${index}`]: reverseString(
          convertToPersianNumber(related.personNationalCode)
        ),
        [`firstName-${index}`]: related.personFirstName || "-",
        [`lastName-${index}`]: related.personLastName || "-",
        [`fatherName-${index}`]: related.personFatherName || "-",
        [`relation-${index}`]: related.relationshipWithParentName || "-",
        [`birthDate-${index}`]:
          reverseString(
            convertToPersianDateFormatted(related.personBirthDate)
          ) || "-",
      };
      if (isDead) {
        commonFields[`supplementaryRight-${index}`] =
          related.supplementaryRight === null
            ? "-"
            : reverseString(
                separateByThousands(
                  convertToPersianNumber(related.supplementaryRight)
                )
              );

        commonFields[`heirRight-${index}`] =
          related.heirRight === null
            ? "-"
            : reverseString(
                separateByThousands(convertToPersianNumber(related.heirRight))
              );

        commonFields[`maritalRight-${index}`] =
          related.maritalRight === null
            ? "-"
            : reverseString(
                separateByThousands(
                  convertToPersianNumber(related.maritalRight)
                )
              );

        commonFields[`childRight-${index}`] =
          related.childRight === null
            ? "-"
            : reverseString(
                separateByThousands(convertToPersianNumber(related.childRight))
              );
      }

      return commonFields;
    }
  );

  for (let i = 0; i < 6; i++) {
    const row = table[i];
    if (row) {
      for (const [fieldName, fieldValue] of Object.entries(row)) {
        const textField = form.getTextField(fieldName);
        if (textField) {
          textField.setText(fieldValue);
          textField.setAlignment(TextAlignment.Center);
          textField.setFontSize(7);
          textField.updateAppearances(customFont);
        }
      }
    }
  }

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    const textField = form.getTextField(fieldName);
    if (textField) {
      textField.setText(fieldValue);
      textField.setAlignment(TextAlignment.Center);
      textField.setFontSize(8);
      textField.updateAppearances(customFont);
    }
  }

  for (const [fieldName, fieldValue] of Object.entries(checkboxes)) {
    const checkBox = form.getCheckBox(fieldName);
    if (checkBox) {
      if (fieldValue) {
        checkBox.check();
      } else {
        checkBox.uncheck();
      }
      checkBox.updateAppearances();
    }
  }

  form.flatten();

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(blob, "حکم.pdf");
};
