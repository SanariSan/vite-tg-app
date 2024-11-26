import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import colors from 'picocolors';
import path from 'path';

// Performance tracking
let startTime;
const logWithTime = (msg, type = 'info') => {
  const time = startTime ? `+${(performance.now() - startTime).toFixed(0)}ms` : '0ms';
  console.log(colors.dim(time), type === 'info' ? colors.blue(msg) : colors.yellow(msg));
};

const wrapEnv = (env) => `'${env}'`;

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      {
        name: 'build-tracker',
        buildStart() {
          startTime = performance.now();
          logWithTime('Build started', 'warn');
        },
        closeBundle() {
          logWithTime('Build finished', 'warn');
        },
      },
      react({
        babel: {
          plugins: [],
        },
      }),
      !isDev &&
        compression({
          algorithm: 'gzip',
          exclude: [/\.(br)$/, /\.(gz)$/],
          deleteOriginalAssets: false,
        }),
    ],

    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
        scss: path.resolve(__dirname, './src/scss'),
      },
    },

    define: {
      'process.env.MAINTENANCE_MODE': wrapEnv(env.MAINTENANCE_MODE),
      'process.env.API_URL': wrapEnv(env.API_URL),
    },

    build: {
      target: ['es2015', 'chrome87', 'firefox78', 'safari14', 'edge88'],
      sourcemap: isDev,
      minify: !isDev,
      cssMinify: !isDev,
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'assets',
      cssCodeSplit: !isDev,
      modulePreload: {
        polyfill: true,
      },
      // manual split for better optimization, figure out later
      // rollupOptions: {
      //   output: {
      //     manualChunks: isDev
      //       ? undefined
      //       : {
      //           'vendor-react': ['react', 'react-dom', 'jotai'],
      //           'vendor-i18n': ['i18next', 'i18next-browser-languagedetector', 'react-i18next'],
      //         },
      //     chunkFileNames: isDev ? '[name].js' : 'assets/[name].[hash].js',
      //     assetFileNames: isDev ? '[name][extname]' : 'assets/[name].[hash][extname]',
      //   },
      // },
    },

    server: {
      port: 3000,
      open: true,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      proxy: {
        '/api': {
          target: 'http://localhost:9000',
          changeOrigin: true,
        },
      },
    },

    preview: {
      port: 3000,
      open: true,
    },

    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isDev ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:8]',
      },
      preprocessorOptions: {
        scss: {
          sourceMap: isDev,
          api: 'modern-compiler', // or "modern"
        },
      },
    },

    publicDir: 'public/static',
  };
});
