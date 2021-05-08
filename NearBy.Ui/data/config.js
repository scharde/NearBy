var baseUrl = "https://2dd47bcf2f9c.ngrok.io/";
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
