  const REMO_ACCESS_TOKEN = 'ory_at_SKAy7ZkXJT6zzsu4K49hLqfGe58OwWPtRZEWAPVieso.S6MMmeztigzr3Q-eFV4LiFVr6RepaFlj3lFpMXJd66A'
   const headers = {
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };
 const applianceId = '690fb3bd-df02-468c-ad7d-a434fa3b8be5';
function getNatureRemoData(endpoint) {


  const options = {
    "method" : "get",
    "headers" : headers,
  };



  return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint + '/' , options))
}
