import React from 'react';
import nextRoutes from 'next-routes';
export const routes = nextRoutes();

const lang = '/:lang(ru|en)?'

const wrapper = {
  add(...args) {
    routes.add(...args)
    return wrapper
  },
  trans(name, params, page) {
    if (!page) {
      page = name
    }
    if (!params) {
      params = ''
    }
    let route
    if (page === '/index') {
      route = ''
    } else {
      route = page
    }
    route = `${lang}${route}${params}`
    routes.add(name, route, page)
    return wrapper
  }
}

wrapper
.trans('index', '', '/index')
.trans('about', '', '/about')
