var baseUrl = "https://c0045e592ccf.ngrok.io/";
var apiUrl = `${baseUrl}api/`;
var config = {
  application: { title: "Calender" },
  facebookapi: { login: "" },
  instagramapi: { login: "" },
  moment: { dateFormat: "L", timeFormat: "LTS" },
  baseUrl: baseUrl,
  Api: {
    getDistanceFeed: `${apiUrl}Feed`,
    registerUser: `${apiUrl}Auth/Register`,
    login: `${apiUrl}Auth/Login`,
  },
};

export { config };
