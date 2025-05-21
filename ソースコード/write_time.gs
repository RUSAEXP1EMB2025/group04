function write_time(column) {
  // スプレッドシート＆シートオブジェクトを取得
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('sensor');
    let today = new Date();
    let day;
  //switch文で0~6の曜日を判定して今日の曜日をログ出力
  switch(today.getDay()){
    case 0 : 
      console.log('日曜日');
        day = 8;
          getSheet('sensor').getRange(day,column).setValues([[new Date()]]);

      break;
    case 1 :
      console.log('月曜日');
        day = 2;
          getSheet('sensor').getRange(day,column).setValues([[new Date()]]);
      break;      
    case 2 :
      console.log('火曜日');
        day = 3;
         getSheet('sensor').getRange(day,column).setValues([[new Date()]]);

      break;      
    case 3 :
      console.log('水曜日');
        day = 4;
         getSheet('sensor').getRange(day,column).setValues([[new Date()]]);
 
      break;      
    case 4 :
      console.log('木曜日');
        day = 5;
           getSheet('sensor').getRange(day,column).setValues([[new Date()]]);

      break;      
    case 5 :
      console.log('金曜日');
        day = 6;
          getSheet('sensor').getRange(day,column).setValues([[new Date()]]);

      break;      
    case 6 :
      console.log('土曜日');
        day = 7;
          getSheet('sensor').getRange(day,column).setValues([[new Date()]]);

      break;      
  }

  
}
