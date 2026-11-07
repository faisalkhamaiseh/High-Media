// HIGH MEDIA portal service worker: shows posting reminders as notifications (also on phones)
// and opens the portal's Content page when a reminder is tapped. It does not cache anything.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || self.registration.scope + "#content";
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const w of wins) {
      if (w.url.split("#")[0] === url.split("#")[0] && "focus" in w) { try { await w.navigate(url); } catch (x) {} return w.focus(); }
    }
    return self.clients.openWindow(url);
  })());
});
