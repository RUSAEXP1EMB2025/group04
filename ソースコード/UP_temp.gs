function up_temp(x) {
  const token = 'Bearer ory_at_SKAy7ZkXJT6zzsu4K49hLqfGe58OwWPtRZEWAPVieso.S6MMmeztigzr3Q-eFV4LiFVr6RepaFlj3lFpMXJd66A';
  const applianceId = '690fb3bd-df02-468c-ad7d-a434fa3b8be5';
  const deviceId = '6a2f3006-1698-46af-a6b9-eef4cc2406bb';

  const url = 'https://api.nature.global/1/appliances/' + applianceId + '/aircon_settings';

  const payload = {
    "temperature": String(x+1),
  };

  const options = {
    method: 'post',
    headers: {
      Authorization: token,
    },
    payload: payload,
   muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);

}
function change_temp_up(){

  up_temp(Number(currentData()));
}
