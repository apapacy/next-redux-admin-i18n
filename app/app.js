"use strict";
// This file doesn't not go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
import config from './config'
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import next from 'next';
import { routes } from './routes';
import i18n from './i18n';
import i18next from 'i18next'
import i18nextMiddleware, { LanguageDetector, missingKeyHandler } from 'i18next-express-middleware';
const Backend = require('i18next-node-fs-backend');

const server = express();
server.use(logger('dev'));
server.use(cookieParser('secret'));
server.use(bodyParser.json({
  limit: '1024mb'
}));
server.use(bodyParser.urlencoded({
  extended: false,
  limit: '1024mb'
}));
server.use(bodyParser.raw({
  inflate: true,
  limit: '1024mb'
}));

server.use('/locales', express.static(__dirname + '/../locales'));
const app = next({
  dev: process.env.NODE_ENV !== 'production'
})
const handler = routes.getRequestHandler(app)


i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    ...config.i18n,
    preload: ['en', 'ru'], // preload all langages
    ns: ['common', 'home', 'page2'], // need to preload all the namespaces
    fallnackLng: 'en',
    saveMissing: true,
    ignoreRoutes: ["/foo"],
    removeLngFromUrl: false,
    backend: {
      loadPath: __dirname + '/../locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/../locales/{{lng}}/{{ns}}.missing.json',
    },
    detection: {
      order: ['path', 'session', 'querystring', 'cookie', 'header'],

        // keys or params to lookup language from
        lookupQuerystring: 'lang',
        //lookupCookie: 'i18next',
        //lookupSession: 'lng',
        // lookupPath: 'lang',
        lookupFromPathIndex: 0,

        // cache user language
        //caches: false, // ['cookie']

        // optional expire and domain for set cookie
        //cookieExpirationDate: new Date(),
        //cookieDomain: 'myDomain'
      },
  }, () => {
    app.prepare().then(() => {
      server.post('/translations/post/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));
      server.use('/translations', express.static(__dirname + '/../locales'))
      server
        .use(i18nextMiddleware.handle(i18next))
        .use(handler)
        .listen(3000, err => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
    })
  });
