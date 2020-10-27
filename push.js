var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BJcajWoJfAlNIKoSBRDYkW3l2CW0kDu3fsk247ZAA615D5esTsf_WQntW7kp0dVtN9XU2m5ul7oCdDoSpfSHFfw",
  privateKey: "BcgLxkBcZwV04AoUhVT3YkcZmmNONBAL0XmWxqnQfCc",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dCDavzmq3ns:APA91bGxI0KxsWBlT-rpiCR962mO7QqxWOyrtZNOy96f3BEbCymhC5O1yJg2nWTEudTei7u-ABaqrtw2B6TlxluY6nes60tM3Ch5trYSlRt0ARlc5Y0mPZudASvMTYRCK3Oa4YGWMoKG",
  keys: {
    p256dh:
      "BHORDtvUA2Y+st5lZ9IIEW9qaMb/GY43yOURblmVcx9Xw8knTYc+QU4lb/AzZzSOjHIWCwPr2nmapEDkFb75A+E=",
    auth: "XgKlLNJUleASOkgfLJIkXA==",
  },
};

var payload = "Selamat, Anda mendapatkan push notification!";

var options = {
  gcmAPIKey: "194336089636",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
