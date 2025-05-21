function poweron_warm() {
  
  const url = 'https://api.nature.global/1/appliances/' + applianceId + '/aircon_settings';

  const payload = {
   operation_mode:'warm'

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
