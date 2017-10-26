import React from 'react';
import nextRoutes from 'next-routes';
export const routes = nextRoutes();

routes
.add('index', '/:lang(ru|en)?', '/index')
.add('about', '/:lang(ru|en)?/about', '/about')
