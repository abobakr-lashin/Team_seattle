const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
      './public/**/*.html', // مسار ملفات HTML
      './src/**/*.js',       // مسار ملفات JavaScript
      './src/**/*.jsx',      // إذا كنت تستخدم React
    ],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  });
  
  module.exports = {
    plugins: [
      require('autoprefixer'), // لتحسين التوافق مع المتصفحات
      purgecss,                 // تفعيل PurgeCSS
    ],
  };
  