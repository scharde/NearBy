import Constants from "expo-constants";
const { manifest } = Constants;
// const baseUrl = `http://${manifest.debuggerHost.split(':').shift()}:44343/`;

var baseUrl = "https://32f177f61e3b.ngrok.io/";
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
