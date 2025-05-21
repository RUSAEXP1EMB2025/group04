function Cool_getValue() {
  // スプレッドシート＆シートオブジェクトを取得
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('sensor');

  let start, fin, sumin, day, before;
  let range;
  const digit = 5;
  
  //今日の日付をDateオブジェクトで取得
  let today = new Date();
  //今日の日付を実行ログに出力
  console.log(today);
  //switch文で0~6の曜日を判定して今日の曜日をログ出力
  switch(today.getDay()){
    case 0 : 
      console.log('日曜日');
        day = 8;
        before = sheet.getRange("I"+day).getValue(); 
        start = sheet.getRange("F"+day).getValue();
        fin = sheet.getRange("G"+day).getValue();
      break;
    case 1 :
      console.log('月曜日');
        day = 2;
        before = sheet.getRange("I"+day).getValue(); 
        start = sheet.getRange("F"+day).getValue();
        fin = sheet.getRange("G"+day).getValue();
      break;      
    case 2 :
      console.log('火曜日');
        day = 3;
        before = sheet.getRange("I"+day).getValue(); 
        start = sheet.getRange("F"+day).getValue();
        fin = sheet.getRange("G"+day).getValue();
      break;      
    case 3 :
      day = 4;
      console.log('水曜日');
        before = sheet.getRange("I"+day).getValue(); 
        start = sheet.getRange("F"+day).getValue();
        fin = sheet.getRange("G"+day).getValue();
      break;      
    case 4 :
      console.log('木曜日');
        day = 5;
        before = sheet.getRange("I"+day).getValue(); 
        start = sheet.getRange("F"+day).getValue();
        fin = sheet.getRange("G"+day).getValue();
      break;      
    case 5 :
      console.log('金曜日');
        day = 6;
        before = sheet.getRange("I"+day).getValue(); 
        start = sheet.getRange("F"+day).getValue();
        fin = sheet.getRange("G"+day).getValue();
      break;      
    case 6 :
      console.log('土曜日');
        day = 7;
        before = sheet.getRange("I"+day).getValue(); 
        start = sheet.getRange("F"+day).getValue();
        fin = sheet.getRange("G"+day).getValue();
      break;      
  }

  if (start instanceof Date && fin instanceof Date) {
    // 差分をミリ秒 → 分に変換
    sumin = ((fin.getTime() - start.getTime()) / (1000 * 60 * 60)) + before;
    sumin = parseFloat(sumin.toFixed(digit));
    sheet.getRange("I"+day).setValue(sumin);
    console.log(`経過時間（分）: ${sumin}`);
    
    sheet.getRange("H"+day).setValue(sumin);
    
  }
}
