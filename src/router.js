import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        // Pages
        {
          name: 'Inicio',
          path: '',
          component: () => import('@/views/dashboard/pages/home'),
        },
        {
          name: 'Parametros del sistema',
          path: 'pages/parametros',
          component: () => import('@/views/dashboard/pages/parametros'),
        },
        {
          name: 'Proveedores',
          path: 'pages/proveedores',
          component: () => import('@/views/dashboard/pages/proveedores'),
        },
        {
          name: 'Secretarios',
          path: 'pages/secretarios',
          component: () => import('@/views/dashboard/pages/secretarios'),
        },
        {
          name: 'camposProveedor',
          path: 'pages/camposProveedor/:CodProv',
          props: true,
          component: () => import('@/views/dashboard/pages/camposProveedor'),
        },
        {
          name: 'camposSecretario',
          path: 'pages/camposSecretario/:CodSecre',
          props: true,
          component: () => import('@/views/dashboard/pages/camposSecretario'),
        },
      ],
    },
  ],
})
