var baseUrl = "https://c1004e010105.ngrok.io/";
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
