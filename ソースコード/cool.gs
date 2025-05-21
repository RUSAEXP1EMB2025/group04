function poweron_cool() {
  const headers = {
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };
  const applianceId = '690fb3bd-df02-468c-ad7d-a434fa3b8be5'; 

  const url = 'https://api.nature.global/1/appliances/' + applianceId + '/aircon_settings';

  const payload = {
   operation_mode:'cool'

  };
  recordTempData();

  const options = {
    "method": "post",
    "headers": headers,
    "payload": payload,
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}
