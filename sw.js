const C='blok-v2',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!='GET')return;
  // сеть в приоритете и в обход HTTP-кэша (GitHub Pages кэширует файлы на 10 минут); офлайн — из кэша
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
