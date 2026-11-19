// Сервис-воркер: приложение открывается и без интернета.
// Файлы всегда берутся с сервера (так обновления приходят сразу), а при отсутствии связи из кэша.
var C = "budget-shell-v2";
var FILES = ["./", "index.html", "firebase-config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "garage-1.jpg", "garage-2.jpg"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(C).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r, { cache: "no-cache" }).then(function (res) {
      var cp = res.clone();
      caches.open(C).then(function (c) { c.put(r, cp); });
      return res;
    }).catch(function () {
      return caches.match(r).then(function (m) { return m || caches.match("index.html"); });
    })
  );
});
