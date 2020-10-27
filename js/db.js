const dbPromised = idb.open("football-pwa", 1, (upgradeDb) => {
  if (!upgradeDb.objectStoreNames.contains("teamFav")) {
    const teamsObjectStore = upgradeDb.createObjectStore("teamFav", {
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
    .then((db) => {
      const tx = db.transaction("teamFav", "readwrite");
      const store = tx.objectStore("teamFav");
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      console.log("Team berhasil disimpan.");
      loadTeams();
      M.toast({ html: "Team berhasil disimpan!" });
    })
    .catch(() => {
      console.log("Team gagal disimpan.");
      M.toast({ html: "Team sudah disimpan!", classes: "red  darken-2" });
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("teamFav", "readonly");
        const store = tx.objectStore("teamFav");
        return store.getAll();
      })
      .then((teams) => {
        resolve(teams);
      });
  });
}

function deleteTeam(id) {
  dbPromised
    .then((db) => {
      const tx = db.transaction("teamFav", "readwrite");
      const store = tx.objectStore("teamFav");
      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      console.log("Team telah dihapus");
      M.toast({ html: "Team berhasil dihapus" });
      loadFav();
    });
}
