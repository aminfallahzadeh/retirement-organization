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
  // const fontUrl = "./src/fonts/Vazir.ttf";
  const fontUrl = `./fonts/Vazir.ttf`;

  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const form = pdfDoc.getForm();

  const fields = {
    // personNationalCode:
    //   convertToPersianNumber(retired.personNationalCode) ?? "-",
    personNationalCode: "11111",
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
      reverseString(convertToPersianDateFormatted(retired.personDeathDate)) ??
      "-",
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
