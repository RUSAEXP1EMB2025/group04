function getSheet(name) {
  const SPREADSHEET_ID = '199yIe1U7JEoBGb0SruJ8Uj34ggJl7jo2ssXY_CsLbKQ'
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    throw new Error('シートが見つかりません');
  }

  return sheet;
}

function getLastData(name) {
  return getSheet(name).getDataRange().getValues().length;
}
