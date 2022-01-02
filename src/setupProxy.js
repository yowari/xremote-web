const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/proxy/xhome',
    createProxyMiddleware({
      target: 'https://uks.gssv-play-prodxhome.xboxlive.com',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy/xhome': '/'
      }
    })
  );

  app.use(
    '/proxy/auth',
    createProxyMiddleware({
      target: 'https://xhome.gssv-play-prod.xboxlive.com',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy/auth': '/'
      }
    })
  );
};
