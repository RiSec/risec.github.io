# RiSTのウェブサイト

[![CircleCI](https://circleci.com/gh/RiSec/risec.github.io/tree/develop.svg?style=svg)](https://circleci.com/gh/RiSec/risec.github.io/tree/develop)

## 必要なもの
* Node.js (npm)

## セットアップ
編集する環境を作成するための作業です。

1. cloneする
2. プロジェクトルートで `npm install` を実行する

## 編集の流れ
1. プロジェクトルートで開発用サーバーを起動するために `npm start` を実行する
2. エディタでファイルを開き内容を変更する
3. ブラウザで http://localhost:3030/ を開き変更を確認する
4. developブランチにpushする

developブランチにpushすると、Circle CIが走り、自動でmasterブランチにビルド済みファイルがpushされます。
masterブランチにpush後、Github Pagesに変更内容が反映されます。
