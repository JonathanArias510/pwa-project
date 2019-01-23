importScripts('/js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1'


const APP_SHELL_STATIC = [
  '/',
  '/index.html',
  '/css/style.css',
  '/img/favicon.ico',
  '/img/avatars/hulk.jpg',
  '/img/avatars/ironman.jpg',
  '/img/avatars/spiderman.jpg',
  '/img/avatars/thor.jpg',
  '/img/avatars/wolverine.jpg',
  '/js/app.js'

];

const APP_SELL_INMUTABLE = [
  'https://fonts.googleapis.com/css?family=Quicksand:300,400',
  'https://fonts.googleapis.com/css?family=Lato:400,300',
  'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
  '/css/animate.css',
  '/js/libs/jquery.js'
]


self.addEventListener('install', event => {

  const cacheStatic = caches.open(STATIC_CACHE)
    .then(cacheReady => cacheReady.addAll(APP_SHELL_STATIC));


  const cacheInmutable = caches.open(INMUTABLE_CACHE)
    .then(cacheReady => cacheReady.addAll(APP_SELL_INMUTABLE));


  event.waitUntil(Promise.all([cacheStatic, cacheInmutable]))

});


self.addEventListener('activate', event => {

  const barrerCache = caches.keys().then(keys => {

    keys.forEach(cacheKey => {
      if (cacheKey !== STATIC_CACHE && cacheKey.includes('static')) {
        return caches.delete(cacheKey);
      }
    })

  })

  event.waitUntil(barrerCache);

});


self.addEventListener('fetch', event => {

  const respuesta = caches.match(event.request)
    .then( res => {

      if(res) {
        return res;
      }else{
        return fetch( event.request ).then( fetchRes => {

          return actualizaCacheDinamico(DYNAMIC_CACHE, event.request,fetchRes);

        })
      }

    });

  event.respondWith(respuesta);

});
