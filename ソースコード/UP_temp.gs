function up_temp(x) {

  const url = 'https://api.nature.global/1/appliances/' + applianceId + '/aircon_settings';

  const payload = {
    "temperature": String(x+1),
  };

  const options = {
    method: 'post',
    headers:headers,
    payload: payload,
   muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);

}
function change_temp_up(){

  up_temp(Number(currentData()));
}
