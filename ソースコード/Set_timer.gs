function triggerTest() {
  Logger.log('トリガーのテストです');
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'poweron') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

function setTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('sensor');
  
  let reservation = sheet.getRange("O2").getValue();
  let hour = Utilities.formatDate(reservation, "JST", "H");
  let minute = Utilities.formatDate(reservation, "JST", "mm");
  let time = new Date();
  time.setHours(hour);  
  time.setMinutes(minute);
  time.setSeconds(0);

  // 過去の時間を指定していないか確認
  if (time.getTime() < new Date().getTime()) {
    time.setDate(time.getDate() + 1);
  }

  ScriptApp.newTrigger('poweron')
    .timeBased()
    .at(time)
    .create();
}
