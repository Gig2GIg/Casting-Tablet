import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import BaseService from './core/BaseService';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


class ExcelService {
  rowHieghtWidth = [
    { hpt: 12 }, // row 1 sets to the height of 12 in points
    { hpx: 16 }, // row 2 sets to the height of 16 in pixels
  ];
  constructor() { }
  async exportAsExcelFile(json, excelFileName) {
    const header = Object.keys(json[0]); // columns name

    var wscols = [];
    for (var i = 0; i < header.length; i++) {  // columns length added
      wscols.push({ wch: header[i].length + 15 })
    }

    const worksheet = XLSX.utils.json_to_sheet(json);

    worksheet['!rows'] = this.rowHieghtWidth;
    worksheet["!cols"] = wscols;

    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    await this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  saveAsExcelFile(buffer, fileName) {
    const data = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

export default new ExcelService();
