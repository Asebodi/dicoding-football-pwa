var webPush = require("web-push");

const vapidKeys = {
  publicKey: "BJcajWoJfAlNIKoSBRDYkW3l2CW0kDu3fsk247ZAA615D5esTsf_WQntW7kp0dVtN9XU2m5ul7oCdDoSpfSHFfw",
  privateKey: "BcgLxkBcZwV04AoUhVT3YkcZmmNONBAL0XmWxqnQfCc",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint: "<Endpoint URL>",
  keys: {
    p256dh: "<p256dh Key>",
    auth: "<Auth key>",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "194336089636",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
