function poweron_cool() {
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
