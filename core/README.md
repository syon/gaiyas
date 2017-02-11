# gaiyas (core)

Chrome拡張の土台は [yeoman/generator\-chrome\-extension](https://github.com/yeoman/generator-chrome-extension) 、コアは Webpack (React・Redux) で開発。

## install

```sh
$ cd gaiyas
$ npm install --global gulp-cli bower
$ cd core
$ cd yarn install
```

## start dev

Gulp と Webpack 両方で watch する。Webpack の更新時に Gulp が bundle.js をコピーしている。

```sh
$ cd gaiyas
$ gulp watch
```
```sh
$ cd core
$ cd yarn start
```

## build

`dist` フォルダに出力される。  
`manifest.json` のバージョン番号がインクリメントされているので確認。

```sh
$ cd gaiyas
$ gulp watch
```
```sh
$ cd core
$ cd yarn build
$ cd ..
$ gulp build
```

## release

- `dist` フォルダを zip 圧縮。
- Chrome ウェブストア 右上のギアアイコンから「デベロッパー ダッシュボード」
  - https://chrome.google.com/webstore/developer/dashboard
