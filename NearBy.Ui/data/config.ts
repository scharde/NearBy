var baseUrl = "https://1c83afcc415c.ngrok.io/";
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
