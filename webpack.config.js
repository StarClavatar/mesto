const path = require('path'); // подключаем path к конфигу вебпак (для относительных путей)
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин 
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // подключили плагин, который удаляет все из папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключите к проекту mini-css-extract-plugin

module.exports = {
    entry: {
        main: './src/pages/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development', //добавили режим разработчика
    devServer: {
        //contentBase: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8081, // порт, чтобы открывать сайт по адресу localhost:8081, но можно поменять порт
        open: true // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        rules: [ // rules — это массив правил
            { // добавим в него объект правил для бабеля
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },
            { // добавили правило для обработки файлов
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            { // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [ //массив плагинов
        new HtmlWebpackPlugin({ //плагин обработки HTML файлов
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(), //плагин очистки цклевой папки перед сборкой
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов css
    ]
}