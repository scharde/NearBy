var baseUrl = "https://cdc5b39ff55d.ngrok.io/";
var apiUrl = `${baseUrl}api/`;
var config = {
  "application": { "title": "Calender" },
  "facebookapi": { "login": "" },
  "instagramapi": { "login": "" },
  "moment": { "dateFormat": "L", "timeFormat": "LTS" },
  "baseUrl": baseUrl,
  "Api": {
    "getDistanceFeed": `${apiUrl}Feed`,
  }
}

export { config };
