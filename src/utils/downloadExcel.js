import * as ExcelJS from "exceljs";
import fs from "file-saver";

export const PackageRows = {
  headers: ["No.", "Name", "Email", "Gender", "Status"],
  rowGetter: (item) => [
    item.index,
    item.name,
    item.email,
    item.gender,
    item.status,
  ],
};
export const downloadList = ({
  title,
  headers,
  list,
  worksheetName,
  rowGetter,
}) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Created Users";

  const header = headers;

  const worksheet = workbook.addWorksheet(worksheetName);

  let titleRow = worksheet.addRow([title]);

  titleRow.font = { name: "Calibri", family: 4, size: 16, bold: true };
  worksheet.mergeCells("A1:F2");
  worksheet.addRow([]);
  worksheet.addRow(["Date : " + new Date().toLocaleString()]);

  let headerRow = worksheet.addRow(header);
  worksheet.addRow([]);

  headerRow.eachCell((cell, number) => {
    cell.style = {
      alignment: { vertical: "middle", horizontal: "center" },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFF00" },
      bgColor: { argb: "FF0000FF" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  list.forEach((item) => {
    worksheet.addRow(rowGetter(item));
  });

  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    fs.saveAs(blob, `${worksheetName}_${new Date().getTime()}.xlsx`);
  });
};
