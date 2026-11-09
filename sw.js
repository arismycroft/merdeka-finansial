/* Service worker sederhana: cache aset statis agar game bisa dibuka tanpa internet.
   Naikkan VERSI setiap kali index.html diperbarui supaya pemain mendapat versi baru. */
const VERSI = 'merdeka-v15';
const ASET = ['/', '/index.html', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/icon-maskable-512.png', '/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSI).then(c => c.addAll(ASET)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return; // Firebase & font tidak dicache di sini
  // jaringan dulu supaya pembaruan cepat sampai; jika offline, pakai cache
  e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(VERSI).then(c => c.put(r, cp)); return res; }).catch(() => caches.match(r).then(m => m || caches.match('/index.html'))));
});
