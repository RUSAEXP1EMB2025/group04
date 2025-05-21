function poweron() {
  
  const url = 'https://api.nature.global/1/appliances/' + applianceId + '/aircon_settings';

  const payload = {
  button: 'power-on'
  };


  const options = {
    "method": "post",
    "headers": headers,
    "payload": payload,
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
      write_time(6);

}
