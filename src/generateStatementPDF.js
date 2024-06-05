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

export const createRelatedStatmentPDF = async (retired, statement) => {
  const url = "./pdfs/related-placeholder.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  pdfDoc.registerFontkit(fontkit);
  // const fontUrl = "./src/fonts/Vazir.ttf";
  const fontUrl = `./fonts/Vazir.ttf`;

  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const form = pdfDoc.getForm();

  const fields = {
    personNationalCode:
      convertToPersianNumber(retired.personNationalCode) ?? "-",
    personLastName: retired.personLastName || "-",
    personFirstName: retired.personFirstName || "-",
    retiredID: retired.retiredID || "-",
    personCertificateNo:
      convertToPersianNumber(retired.personCertificateNo) ?? "-",
    personFatherName: retired.personFatherName || "-",
    personBirthDate:
      convertToPersianDateFormatted(retired.personBirthDate) ?? "-",
    personBirthPlace: retired.personBirthPlace || "-",
    gender: retired.gender || "-",
    retirementStatementChildrenCount:
      convertToPersianNumber(retired.retirementStatementChildrenCount) ?? "-",
    insuranceCode: convertToPersianNumber(retired.insuranceCode) ?? "-",
    maritialStatus: retired.maritialStatus || "-",
    personPostalCode: convertToPersianNumber(retired.personPostalCode) ?? "-",
    retirementStatementSerial:
      convertToPersianNumber(statement.retirementStatementSerial) ?? "-",
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
    employmentTypeName: retired.employmentTypeName || "-",
    personDeathDate:
      reverseString(convertToPersianDateFormatted(retired.personDeathDate)) ??
      "-",
    retirementStatementDesc: statement.retirementStatementDesc || "-",
  };

  const checkboxes = {
    personIsSacrificedFamily: retired.personIsSacrificedFamily || false,
    personIsValiant: retired.personIsValiant || false,
    personIsCaptive: retired.personIsCaptive || false,
    personIsWarrior: retired.personIsWarrior || false,
    personIsSacrificed: retired.personIsSacrificed || false,
    personIsChildOfSacrificed: retired.personIsChildOfSacrificed || false,
  };

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    const textField = form.getTextField(fieldName);
    if (textField) {
      textField.setText(fieldValue);
      textField.setAlignment(TextAlignment.Right);
      textField.setFontSize(9);
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

export const createHeirStatmentPDF = async (retired, statement) => {
  const url = "./pdfs/heir-placeholder.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  pdfDoc.registerFontkit(fontkit);
  const fontUrl = `./fonts/Vazir.ttf`;

  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const form = pdfDoc.getForm();

  const statementItems = {};

  const searchKey = "retirementStatementItemID";
  const searchValues = {
    first: "1001",
    second: "1002",
    third: "1003",
    forth: "1004",
  };
  const newKeys = {
    first: "basicSalary",
    second: "suplementaryPension",
    third: "familyAllowance",
    forth: "childAllowance",
  };

  const findAndAssign = (arr, target, key, searchValues, newKeys) => {
    arr.forEach((obj) => {
      Object.keys(searchValues).forEach((keyName) => {
        if (obj[key] === searchValues[keyName]) {
          const itemKey = "retirementStatementItemAmount";
          if (itemKey in obj) {
            target[newKeys[keyName]] = String(obj[itemKey]);
          }
        }
      });
    });
  };

  findAndAssign(
    statement.retirementStatementAmountList,
    statementItems,
    searchKey,
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
    gender: retired.gender || "-",
    retirementStatementChildrenCount:
      convertToPersianNumber(retired.retirementStatementChildrenCount) ?? "-",
    insuranceCode: convertToPersianNumber(retired.insuranceCode) ?? "-",
    maritialStatus: retired.maritialStatus || "-",
    personPostalCode: convertToPersianNumber(retired.personPostalCode) || "-",
    retirementStatementSerial:
      convertToPersianNumber(statement.retirementStatementSerial) ?? "-",
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
      convertToPersianDateFormatted(statement.retirementStatementRunDate) ||
      "-",
    retirementStatementIssueDate:
      convertToPersianDateFormatted(statement.retirementStatementIssueDate) ||
      "-",
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
    (related, index) => ({
      [`heirRowNumber-${index}`]: convertToPersianNumber(index + 1),
      [`heirNationalCode-${index}`]: reverseString(
        convertToPersianNumber(related.personNationalCode)
      ),
      [`heirFirstName-${index}`]: related.personFirstName || "-",
      [`heirLastName-${index}`]: related.personLastName || "-",
      [`heirFatherName-${index}`]: related.personFatherName || "-",
      [`heirRelation-${index}`]: related.relationshipWithParentName || "-",
      [`heirBirthDate-${index}`]:
        reverseString(convertToPersianDateFormatted(related.personBirthDate)) ||
        "-",
      [`heirRight-${index}`]:
        related.heirRight === null
          ? "-"
          : reverseString(
              separateByThousands(convertToPersianNumber(related.heirRight))
            ),

      [`supplementaryRight-${index}`]:
        related.supplementaryRight === null
          ? "-"
          : reverseString(
              separateByThousands(
                convertToPersianNumber(related.supplementaryRight)
              )
            ),

      [`maritalRight-${index}`]:
        related.maritalRight === null
          ? "-"
          : reverseString(
              separateByThousands(convertToPersianNumber(related.maritalRight))
            ),

      [`childRight-${index}`]:
        related.childRight === null
          ? "-"
          : reverseString(
              separateByThousands(convertToPersianNumber(related.childRight))
            ),
    })
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
      textField.setFontSize(9);
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
