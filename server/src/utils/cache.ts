const cache = new Map();

export const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse && cachedResponse.expiry > Date.now()) {
      return res.send(cachedResponse.data);
    }

    const originalSend = res.send;

    res.send = function(body) {
      if (res.statusCode === 200) {
        cache.set(key, {
          data: body,
          expiry: Date.now() + duration * 1000
        });
      }
      
      originalSend.call(this, body);
    };

    next();
  };
};

export const setCache = (key, data, ttl = 300) => {
  cache.set(key, {
    data,
    expiry: Date.now() + ttl * 1000
  });
};

export const getCache = (key) => {
  const cachedItem = cache.get(key);
  
  if (cachedItem && cachedItem.expiry > Date.now()) {
    return cachedItem.data;
  }
  
  return undefined;
};

export const deleteCache = (key) => {
  cache.delete(key);
};


export const flushCache = () => {
  cache.clear();
}; 