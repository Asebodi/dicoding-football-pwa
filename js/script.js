let teamsData

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
      if (this.readyState == 4) {
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

    html += `
    <div class="home-wrapper">
      <div class="home-header">
        <div class="bg"></div>
        <div class="container header-content white-text">
          <div class="header-content-inner">
            <h2>Bola</h2>
            <p>Sumber informasi bola Liga Inggris</p>
          </div>
        </div>
      </div>

      <div class="container">
        <h4 class="center-align">Tim Favorit</h4>
        <div class="home-fav">
          <!-- <div class="card no-fav home-fav-item center-align">
            <h5>Belum ada favorit!</h5>
          </div> -->
          <div class="card center-align home-fav-item">
            <img src="/assets/everton.svg" alt="" />
            <p class="flow-text">Everton</p>
          </div>

          <div class="card center-align home-fav-item">
            <img src="/assets/everton.svg" alt="" />
            <p class="flow-text">Manchester United</p>
          </div>
        </div>
        <a href="#favorite" class="more right-align">Lebih lanjut..</a>

        <h4 class="center-align">Klasemen</h4>
        <p class="center-align" style="display: block; margin-top: -10px">
          Top 5
        </p>
        <div class="standing-container">
          <table class="card standing-table">${standingFetch}</table>

          <a href="#standing" class="more right-align">Lebih lanjut..</a>
        </div>
      </div>
    </div>
    `;

    document.querySelector("#body-content").innerHTML = html;
  });
}

function loadStandings() {
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
  const teams = getTeams();
  let html = "";
  let teamsFetch = "";

  teams.then((data) => {
    data.teams.map((team) => {
      teamsFetch += `
        <div class="card">
          <div class="team-title">
            <img src="${team.crestUrl}" alt="Logo ${team.shortName}" />
            <strong class="flow-text">${team.name}</strong>
          </div>
          <div class="fav-action">
            <img src="/assets/heart-regular.svg" alt="" />
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
}

function loadFav() {
  const teams = getTeams();

  teams.then(data => {
    teamsData = data

    
  })

  let html = `
    <div class="teams-container container">
      <h3 class="center-align">Tim Favorit</h3>
      <p class="center-align" style="display: block; margin-top: -10px">
        Liga Inggris
      </p>
            <div class="card">
            <div class="team-title">
              <img src="/assets/everton.svg" alt="" />
              <strong class="flow-text">$Everton</strong>
            </div>
            <div class="fav-action">
              <img src="/assets/trash.svg" alt="" />
            </div>
          </div>
          <div class="card">
            <div class="team-title">
              <img src="/assets/everton.svg" alt="" />
              <strong class="flow-text">$Everton</strong>
            </div>
            <div class="fav-action">
              <img src="/assets/trash.svg" alt="" />
            </div>
          </div>
    </div>
  `;
  let favTeams = ``;

  document.querySelector("#body-content").innerHTML = html;
}
