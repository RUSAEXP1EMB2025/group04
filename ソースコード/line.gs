/*const REMO_ACCESS_TOKEN = 'ory_at_4zpd5aZKR2GiBGr5HN6djT-hVrcFkbVwr50aa1InkI4.uf47VKhX9B6cPmJSrW4ZdANri2GI1yuzNk2vXp8By3U';
const APPLIANCE_ID = 'e4698e30-11e4-4ac6-b274-20ac1ab4c336';*/
const APPLIANCE_ID = '690fb3bd-df02-468c-ad7d-a434fa3b8be5';
const LINE_CHANNEL_TOKEN = "LTAGV2M5o/lD/7/n4mh+vk9jbUYBUhbwYJF4LMKzgRDPgjY4Ge5/ipbgQCfEFbbOkRuHm3M0GG4TiXSjZMsNutQ/tlsnoM/bxdP0ouVbVS7AXdxaUep8RwwfkOOOXuuL8Uveot9c1ijdTAV9G0dJnAdB04t89/1O/w1cDnyilFU="; 
const USERID = "Ud376e1a6bc33e0496f278d3897fa2960"

function doPost(e) {
  const json = JSON.parse(e.postData.contents);
  const event = json.events[0];
  const replyToken = event.replyToken;
  if (event.postback) {
    const data = event.postback.data;
    const params = event.postback.params;
    Logger.log("Postback data: " + data);
    Logger.log("Postback params: " + JSON.stringify(params));
    if (data === "action=selectTime" && params && params.time) {
      const selectedTime = params.time;
      Logger.log("Selected time: " + selectedTime);
      try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sensor");
        sheet.getRange("O2").setValue(selectedTime);
        replyMessage(replyToken, `${selectedTime} にエアコンを予約しました。`);
        setTrigger();
      } catch (err) {
        Logger.log("Error writing to sheet: " + err);
        replyMessage(replyToken, "時間の書き込みに失敗しました。");
      }
    } else {
      replyMessage(replyToken, "無効な時間データです。");
    }
    return ContentService.createTextOutput("OK");
  }
  const messageText = event.message && event.message.text;

  if (messageText === "toggle_power") {
    const endpoint = 'https://api.nature.global/1/appliances';
    const options = {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN
      }
    };

  const response = UrlFetchApp.fetch(endpoint, options);
  const appliances = JSON.parse(response.getContentText());

  for (let i = 0; i < appliances.length; i++) {
    const appliance = appliances[i];
    if (appliance.id === APPLIANCE_ID && appliance.settings) {
      const powerStatus = appliance.settings.button === 'power-off' ? 'OFF' : 'ON';
      if (powerStatus === "ON") {
        poweroff();
        replyMessage(replyToken, "電源をオフにしました");
        AC_Status(USERID);
      } else if(powerStatus === "OFF"){
        poweron();
        replyMessage(replyToken, "電源をオンにしました")
        AC_Status(USERID);
      } else {
      }
        return;
      }
    }
  } else if (messageText === "AC_Status") {
    AC_Status(USERID);
  } else if (messageText === "UP_temp") {
    change_temp_up();
    replyMessage(replyToken, "温度を一度上げました");
    AC_Status(USERID);
  } else if (messageText === "DOWN_temp") {
    change_temp_down();
    replyMessage(replyToken, "温度を一度下げました");
    AC_Status(USERID);
  } else if (messageText === "toggle_mode") {
    const endpoint = 'https://api.nature.global/1/appliances';
    const options = {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN
      }
    };

    const response = UrlFetchApp.fetch(endpoint, options);
    const appliances = JSON.parse(response.getContentText());

    for (let i = 0; i < appliances.length; i++) {
      const appliance = appliances[i];
      if (appliance.id === APPLIANCE_ID && appliance.aircon) {
      const currentMode = appliance.settings.mode;
      let newMode = "";
      if (currentMode === "cool") {
            poweron_warm();
            newMode = "warm";
          } else if (currentMode === "warm") {
            poweron_cool();
            newMode = "cool";
          } 
        replyMessage(replyToken, 'モードを${newMode === "cool" ? "冷房" : "暖房"}に切り替えました。');
        AC_Status(USERID);  // モード変更後の状態をPush APIで送信
        return;
      }
    }
  }
   else if (messageText === "Power_Bill") {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sensor");
    const value = sheet.getRange("N9").getValue();
    replyMessage(replyToken, `今週の電気代は${value}円です。`);
  } else {
  }

  return ContentService.createTextOutput("OK");
}

function AC_Status(userId) {
  const endpoint = 'https://api.nature.global/1/appliances';
  const options = {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN
    }
  };

  const response = UrlFetchApp.fetch(endpoint, options);
  const appliances = JSON.parse(response.getContentText());

  for (let i = 0; i < appliances.length; i++) {
    const appliance = appliances[i];
    if (appliance.id === APPLIANCE_ID && appliance.settings) {
      const powerStatus = appliance.settings.button === 'power-off' ? 'OFF' : 'ON';
      if (powerStatus === "ON") {
        const modeJP = appliance.settings.mode === "cool" ? "冷房" :
                       appliance.settings.mode === "warm" ? "暖房" :
                       appliance.settings.mode === "dry"  ? "除湿" :
                       appliance.settings.mode === "auto" ? "自動" : "その他";

        const temp = appliance.settings.temp;
        const message = `現在のエアコンの状態\nモード: ${modeJP}\n温度: ${temp}度`;
        pushMessage(userId, message);
      } else {
        pushMessage(userId, "現在、エアコンはオフになっています。");
      }
      return;
    }
  }
}


function pushMessage(userId, text) {
  const url = "https://api.line.me/v2/bot/message/push";

  const payload = JSON.stringify({
    to: userId,
    messages: [{ type: "text", text: text }]
  });

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + LINE_CHANNEL_TOKEN
    },
    payload: payload
  };

  UrlFetchApp.fetch(url, options);
}


function replyMessage(replyToken, text) {
  const url = "https://api.line.me/v2/bot/message/reply";
  

  const payload = JSON.stringify({
    replyToken: replyToken,
    messages: [{ type: "text", text: text }]
  });

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + LINE_CHANNEL_TOKEN
    },
    payload: payload
  };

  UrlFetchApp.fetch(url, options);
}

