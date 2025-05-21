function poweroff() {

  const url = 'https://api.nature.global/1/appliances/' + applianceId + '/aircon_settings';

  const payload = {
    button: 'power-off'
  };

  const options = {
    method: 'post',
    headers:headers,
    payload: payload,
   muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log('エアコンOFF：' + response.getContentText());
    write_time(7);
    Cool_getValue();
}
