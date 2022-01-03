const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/proxy/xhome',
    createProxyMiddleware({
      target: 'https://uks.gssv-play-prodxhome.xboxlive.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/proxy/xhome': '/'
      }
    })
  );

  app.use(
    '/api/proxy/auth',
    createProxyMiddleware({
      target: 'https://xhome.gssv-play-prod.xboxlive.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/proxy/auth': '/'
      }
    })
  );
};
