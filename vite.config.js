export default {
    build: {
      rollupOptions: {
        input: './SPA-ABSTISA/main.js',
        external: [
          '/router.js',
          '/styles.css',
          '/index.html',
          '/components/nav.js',
          '/components/colors.js',
          '/components/home.js',
          '/components/info.js',
          '/components/notfound.js',
          '/public/lock.svg',
          '/public/unlock.svg',
          '/public/TGicon.jpg',
          '/public/_redirects',
        ],
      },
    },
  }