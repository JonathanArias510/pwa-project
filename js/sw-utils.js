
const actualizaCacheDinamico = (dynamicCache, req, res) => {

  if (res.ok) {
    return caches.open(dynamicCache)
      .then( cacheReady => {

        cacheReady.put(req, res.clone());
        return res;

      });

  }else {
    return res;
  }


}
