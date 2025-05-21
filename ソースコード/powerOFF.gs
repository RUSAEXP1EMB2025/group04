function poweroff() {
  const token = 'Bearer ory_at_SKAy7ZkXJT6zzsu4K49hLqfGe58OwWPtRZEWAPVieso.S6MMmeztigzr3Q-eFV4LiFVr6RepaFlj3lFpMXJd66A';
  const applianceId = '690fb3bd-df02-468c-ad7d-a434fa3b8be5';

  const url = 'https://api.nature.global/1/appliances/' + applianceId + '/aircon_settings';

  const payload = {
    button: 'power-off'
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
  Logger.log('エアコンOFF：' + response.getContentText());
    write_time(7);
    Cool_getValue();
}
