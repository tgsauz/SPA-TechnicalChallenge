export default {
    build: {
      rollupOptions: {
        input: '/SPA-ABSTISA/main.js',
        external: [
          '/router.js',
        ],
      },
    },
  }