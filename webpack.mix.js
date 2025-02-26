const mix = require("laravel-mix");

// Cleans up terminal output
mix.disableNotifications();

mix.webpackConfig({
  watchOptions: {
    ignored: /mix-manifest.json/,
  },
});

// Basic Mix setup
mix
  .js("src/js/app.js", "public/js")
  .postCss("src/css/app.pcss", "public/css", [require("@tailwindcss/postcss")]);
