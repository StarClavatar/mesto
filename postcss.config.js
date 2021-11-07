// подключите плагины в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    plugins: [ // подключите плагины к PostCSS
        // подключите autoprefixer (добавляет вендорные префиксы для разных браузеров)
        autoprefixer,
        // cssnano (для минификации CSS) при подключении нужно передать объект опций
        // { preset: default } говорит о том, что нужно использовать
        // стандартные настройки минификации
        cssnano({
            preset: 'default'
        })
    ]
};