const baseUrl = "https://api.football-data.org/v2/";
const standingUrl = `${baseUrl}competitions/2021/standings`;
const teamsUrl = `${baseUrl}competitions/2021/teams`;

function fetchApi(url) {
  console.log("fetching");
  return fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": "90749723f2f7496fb1d84c3931768f80",
    },
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error: " + error);
}

function getStandings() {
  return new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches.match(standingUrl).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resolve(data);
          });
        }
      });
    }

    fetchApi(standingUrl)
      .then(status)
      .then(json)
      .then(function (data) {
        resolve(data);
      });
  });
}

function getTeams() {
  return new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches.match(teamsUrl).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log(data);
            resolve(data);
          });
        }
      });
    }

    fetchApi(teamsUrl)
      .then(status)
      .then(json)
      .then(function (data) {
        resolve(data);
      });
  });
}
