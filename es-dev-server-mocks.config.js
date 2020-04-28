const bodyParser = require('koa-bodyparser');

console.log('running with mocks'); // eslint-disable-line no-console
let mock;
let mockFileName;
module.exports = {
  port: 8000,
  nodeResolve: true,
  preserveSymlinks: true,
  http2: true,
  sslCert: './certs/localhost.crt',
  sslKey: './certs/localhost.key',
  middlewares: [
    bodyParser(),
    function mockLoader(ctx, next) {
      if (ctx.query.mock) {
        mockFileName = ctx.query.mock;
        if (mockFileName) {
          mock = require(`./mocks/${mockFileName}.js`); // eslint-disable-line import/no-dynamic-require, global-require
        }
      }
      if (ctx.path === '/api' && mock) {
        const mockResponse = mock(ctx);
        if (!mockResponse.errorStatus) {
          ctx.body = mockResponse;
        } else {
          ctx.status = mockResponse.errorStatus;
        }
        return ctx;
      }
      // pass through
      return next();
    },
  ],
  responseTransformers: [function({ contentType, body }) {
    if (contentType.includes('text/html')) {

      return {
        body: body
          .replace('{{TITLE}}', 'tester'),
      };
    }
    return { body };
  }],
};
