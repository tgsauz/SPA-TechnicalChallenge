export default {
    build: {
      rollupOptions: {
        input: '/SPA-ABSTISA/main.js',
        external: [
          '/SPA-ABSTISA/router.js',
          '/SPA-ABSTISA/styles.css',
          '/SPA-ABSTISA/index.html',
          '/SPA-ABSTISA/components/nav.js',
          '/SPA-ABSTISA/components/colors.js',
          '/SPA-ABSTISA/components/home.js',
          '/SPA-ABSTISA/components/about.js',
          '/SPA-ABSTISA/components/notfound.js',
          '/SPA-ABSTISA/public/lock.svg',
          '/SPA-ABSTISA/public/unlock.svg',
          '/SPA-ABSTISA/public/TGicon.jpg',
        ],
      },
    },
  }