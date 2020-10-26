const dbPromised = idb.open("football-pwa", 1, function (upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("teamFav")) {
    var teamsObjectStore = upgradeDb.createObjectStore("teamFav", {
      keyPath: "id",
    });
    teamsObjectStore.createIndex("team", "team", {
      unique: true,
    });
  }
});

function addTeam(id, crest, name, shortName) {
  const team = {
    id,
    crest,
    name,
    shortName,
  };
  console.log(team);

  dbPromised
    .then(function (db) {
      var tx = db.transaction("teamFav", "readwrite");
      var store = tx.objectStore("teamFav");
      store.add(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil disimpan.");
      location.reload();
    })
    .catch(function () {
      console.log("Team gagal disimpan.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teamFav", "readonly");
        var store = tx.objectStore("teamFav");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function deleteTeam(id) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teamFav", "readwrite");
      var store = tx.objectStore("teamFav");
      store.delete(id);
      return tx.complete;
    })
    .then(function () {
      console.log("Team telah dihapus");
      location.reload();
    });
}
