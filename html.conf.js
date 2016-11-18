export default {
  inject: false,
  template: require('html-webpack-template'),
  title: 'Grimoire',
  appMountId: 'root',
  mobile: true,
  meta: {
    'apple-mobile-web-app-capable': 'yes',
    'theme-color': '#ff0000',
  },
  links: [
    'https://fonts.googleapis.com/css?family=Asul:400',
    {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
    {rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png', type: 'image/png'},
    {rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png', type: 'image/png'},
    {rel: 'mask-icon', color: '#ff0000', href: '/safari-pinned-tab.svg'},
  ],
};
