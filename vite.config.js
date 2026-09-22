import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const scssAliasImporter = {
  findFileUrl(url) {
    if (url.startsWith('@/')) {
      return new URL(pathToFileURL(path.resolve(__dirname, 'src', url.slice(2))).href);
    }
    return null;
  },
};

function jsxInJs() {
  return {
    name: 'jsx-in-js',
    async transform(code, id) {
      if (!id.includes('/src/') || !id.endsWith('.js') || id.includes('node_modules')) {
        return null;
      }
      return transformWithEsbuild(code, id, {
        loader: 'jsx',
        jsx: 'automatic',
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      jsxInJs(),
      react({ include: /\.(jsx|js)$/ }),
      {
        name: 'enquiry-dev-mock',
        configureServer(server) {
          server.middlewares.use('/api/enquiry.php', (req, res, next) => {
            if (req.method !== 'POST') {
              next();
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              res.setHeader('Content-Type', 'application/json');
              try {
                const data = JSON.parse(body || '{}');
                if (data.website) {
                  res.end(JSON.stringify({ message: 'Enquiry received.' }));
                  return;
                }
                res.end(
                  JSON.stringify({
                    message: 'Thank you! Our counsellor will contact you soon.',
                    mailMode: 'dev-mock',
                  }),
                );
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid request body.' }));
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'next/image': path.resolve(__dirname, 'src/compat/next-image.jsx'),
        'next/link': path.resolve(__dirname, 'src/compat/next-link.jsx'),
        'next/navigation': path.resolve(__dirname, 'src/compat/next-navigation.js'),
        'next/dynamic': path.resolve(__dirname, 'src/compat/next-dynamic.jsx'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          importers: [scssAliasImporter],
          loadPaths: [path.resolve(__dirname, 'src')],
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    define: {
      'process.env.NEXT_PUBLIC_APP_NAME': JSON.stringify(
        env.VITE_APP_NAME || env.NEXT_PUBLIC_APP_NAME || '',
      ),
      'process.env.NEXT_PUBLIC_SITE_URL': JSON.stringify(
        env.VITE_SITE_URL || env.NEXT_PUBLIC_SITE_URL || '',
      ),
      'process.env.NEXT_PUBLIC_WHATSAPP_NUMBER': JSON.stringify(
        env.VITE_WHATSAPP_NUMBER || env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
      ),
      'process.env.NEXT_PUBLIC_CONTACT_EMAIL': JSON.stringify(
        env.VITE_CONTACT_EMAIL || env.NEXT_PUBLIC_CONTACT_EMAIL || '',
      ),
      'process.env.NEXT_PUBLIC_CONTACT_PHONE': JSON.stringify(
        env.VITE_CONTACT_PHONE || env.NEXT_PUBLIC_CONTACT_PHONE || '',
      ),
      'process.env.NEXT_PUBLIC_FACEBOOK_URL': JSON.stringify(
        env.VITE_FACEBOOK_URL || env.NEXT_PUBLIC_FACEBOOK_URL || '',
      ),
      'process.env.NEXT_PUBLIC_INSTAGRAM_URL': JSON.stringify(
        env.VITE_INSTAGRAM_URL || env.NEXT_PUBLIC_INSTAGRAM_URL || '',
      ),
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  };
});
