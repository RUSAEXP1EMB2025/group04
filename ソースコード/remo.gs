  const REMO_ACCESS_TOKEN = 'ory_at_SKAy7ZkXJT6zzsu4K49hLqfGe58OwWPtRZEWAPVieso.S6MMmeztigzr3Q-eFV4LiFVr6RepaFlj3lFpMXJd66A'
   const headers = {
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };
function getNatureRemoData(endpoint) {


  const options = {
    "method" : "get",
    "headers" : headers,
  };



  return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint + '/' , options))
}
