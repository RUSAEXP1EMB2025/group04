function reset() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('sensor');

  let range = sheet.getRange('H2:H8');
  let values = Array(7).fill(['0']); // 7行1列の配列を生成
  range.setValues(values);
  range = sheet.getRange('G2:G8');
  values = Array(7).fill(['0']); // 7行1列の配列を生成
  range.setValues(values);
  range = sheet.getRange('L2:L8');
  values = Array(7).fill(['0']); // 7行1列の配列を生成
  range.setValues(values);
  range = sheet.getRange('M2:M8');
  values = Array(7).fill(['0']); // 7行1列の配列を生成
  range.setValues(values);
}
