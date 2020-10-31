document.addEventListener("DOMContentLoaded", function () {
  // Query selector navigasi
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    if (page == "home") loadHome();
    if (page == "standings") loadStandings();
    if (page == "teams") loadTeams();
    if (page == "favorite") loadFav();
  }

  // Konten Navigasi
  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", (event) => {
              const sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }
});

function loadHome() {
  showLoader();

  const standings = getStandings();
  const fav = getAll();
  let standingFetch = `
    <tr>
      <th>Tim</th>
      <th class="center-align">Won</th>
      <th class="center-align">Draw</th>
      <th class="center-align">Lost</th>
    </tr>
  `;

  fav.then((favRaw) => {
    standings.then((data) => {
      const favJson = JSON.stringify(favRaw).replace(/http:/g, "https:");
      const favTeam = JSON.parse(favJson);

      let html = "";

      for (i = 0; i < 5; i++) {
        standingFetch += `
          <tr>
            <td>${data.standings[0].table[i].team.name}</td>
            <td class="center-align">${data.standings[0].table[i].won}</td>
            <td class="center-align">${data.standings[0].table[i].draw}</td>
            <td class="center-align">${data.standings[0].table[i].lost}</td>
          </tr>
        `;
      }

      let favDisplay = ``;

      if (favTeam.length == 0) {
        favDisplay += `<div class="card no-fav home-fav-item center-align"> <h5>Belum ada team favorit!</h5> </div>`;
      } else if (favTeam.length < 2) {
        favDisplay += `
            <div class="card center-align home-fav-item">
              <img src="${favTeam[0].crest}" alt="${favTeam[0].shortName}" />
              <p class="flow-text">${favTeam[0].name}</p>
            </div>
          `;
      } else {
        for (i = 0; i < 2; i++) {
          favDisplay += `
            <div class="card center-align home-fav-item">
              <img src="${favTeam[i].crest}" alt="${favTeam[i].shortName}" />
              <p class="flow-text">${favTeam[i].name}</p>
            </div>
          `;
        }
      }

      html += `
      <div class="home-wrapper">
        <div class="home-header">
          <div class="bg"></div>
          <div class="container header-content white-text">
            <div class="header-content-inner">
              <img src="/assets/logo.svg" class="header-logo" style="height: 2.5rem"></img>
              <p>Sumber informasi bola Liga Inggris</p>
            </div>
          </div>
        </div>
  
        <div class="container">
          <h4 class="center-align">Tim Favorit</h4>
          <div class="home-fav">
            ${favDisplay}
          </div>
          <a href="#favorite" class="more right-align" onclick="loadFav()">Lebih lanjut..</a>
  
          <h4 class="center-align">Klasemen</h4>
          <p class="center-align" style="display: block; margin-top: -10px">
            Top 5
          </p>
          <div class="standing-container">
            <table class="card standing-table striped">${standingFetch}</table>
  
            <a href="#standing" class="more right-align" onclick="loadStandings()">Lebih lanjut..</a>
          </div>
        </div>
      </div>
      `;

      document.querySelector("#body-content").innerHTML = html;
    });
  });
}

function loadStandings() {
  showLoader();

  const standings = getStandings();
  let standingFetch = `
    <tr>
      <th>Tim</th>
      <th class="center-align">Won</th>
      <th class="center-align">Draw</th>
      <th class="center-align">Lost</th>
    </tr>
  `;

  standings.then((data) => {
    let html = "";

    data.standings[0].table.map((standing) => {
      standingFetch += `
        <tr>
          <td>${standing.team.name}</td>
          <td class="center-align">${standing.won}</td>
          <td class="center-align">${standing.draw}</td>
          <td class="center-align">${standing.lost}</td>
        </tr>
      `;
    });

    html += `
      <div class="standing-container container">
        <h3 class="center-align">Klasemen</h3>
        <p class="center-align" style="display: block; margin-top: -10px">
          Liga Inggris
        </p>

        <div class="standing-container">
          <table class="card standing-table striped">${standingFetch}</table>
        </div>
      </div>
    `;

    document.querySelector("#body-content").innerHTML = html;
  });
}

function loadTeams() {
  showLoader();

  const teams = getTeams();
  const fav = getAll();

  let html = "";
  let teamsFetch = "";

  fav.then((favData) => {
    teams.then((dataRaw) => {
      const dataJson = JSON.stringify(dataRaw).replace(/http:/g, "https:");
      const data = JSON.parse(dataJson);

      data.teams.map((team) => {
        function checkFav(fav) {
          return fav.id == team.id;
        }

        const heart =
          favData.filter(checkFav).length !== 0
            ? "/assets/svg/heart-solid.svg"
            : "/assets/svg/heart-regular.svg";

        teamsFetch += `
          <div class="card">
            <div class="team-title">
              <img src="${team.crestUrl}" alt="Logo ${team.shortName}" />
              <strong class="flow-text">${team.name}</strong>
            </div>
            <div class="fav-action wafe-effect" onclick="addTeam(${team.id}, '${team.crestUrl}', '${team.name}', '${team.shortName}')" >
              <img src="${heart}" alt="" />
            </div>
          </div>
        `;
      });

      html += `
        <div class="teams-container container">
          <h3 class="center-align">Tim</h3>
          <p class="center-align" style="display: block; margin-top: -10px">
            Liga Inggris
          </p>
          ${teamsFetch}
        </div>
      `;

      document.querySelector("#body-content").innerHTML = html;
    });
  });
}

function loadFav() {
  showLoader();

  const teams = getAll();

  let favTeams = ``;
  let html = ``;

  teams.then((rawData) => {
    const favJson = JSON.stringify(rawData).replace(/http:/g, "https:");
    const data = JSON.parse(favJson);

    if (data.length == 0) {
      favTeams += `<div class="card no-fav home-fav-item center-align"> <h5 style="width: 100%">Belum ada team favorit!</h5> </div>`;
    } else {
      data.map((team) => {
        favTeams += `
          <div class="card">
            <div class="team-title">
              <img src="${team.crest}" alt="Logo ${team.shortName}" />
              <strong class="flow-text">${team.name}</strong>
            </div>
            <div class="fav-action">
              <img src="/assets/svg/trash.svg" alt="Hapus team" onclick="deleteTeam(${team.id})" />
            </div>
          </div>
        `;
      });
    }

    html += `
      <div class="teams-container container">
        <h3 class="center-align">Tim Favorit</h3>
        <p class="center-align" style="display: block; margin-top: -10px">
          Liga Inggris
        </p>
        
        ${favTeams}

      </div>
    `;

    document.querySelector("#body-content").innerHTML = html;
  });
}

function showLoader() {
  const html = `
    <div class="loader-container">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  `;

  document.querySelector("#body-content").innerHTML = html;
}
