'use strict';

// パッケージのインストール
const line = require('@line/bot-sdk');

// LINEアクセストークンの設定
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// インスタンス化
const client = new line.Client(config);

// モジュールのインストール
const translate = require('./Common/getTranslate');
const dynamodb = require('./Common/putDynamoDB');

exports.handler = async (event, context) => {
  // JSONとして解析して値やオブジェクトを構築する
  const body = JSON.parse(event.body);

  // LINE Eventを取得
  const response = body.events[0];

  // 翻訳を行う
  const input_text = response.message.text;
  const sourceLang = 'ja';
  const targetLang = 'en';

  // 翻訳（関数呼び出し）
  const res = await translate.getTranslate(input_text, sourceLang, targetLang);
  const output_text = res.TranslatedText;

  // メッセージ送信のために必要な情報
  const replyToken = response.replyToken;
  const post = {
    type: 'text',
    text: output_text,
  };

  // DB-タイムスタンプ
  const date = new Date();
  const Y = date.getFullYear();
  const M = ('00' + (date.getMonth() + 1)).slice(-2);
  const D = ('00' + date.getDate()).slice(-2);
  const h = ('00' + (date.getHours() + 9)).slice(-2);
  const m = ('00' + date.getMinutes()).slice(-2);
  const s = ('00' + date.getSeconds()).slice(-2);
  const dayTime = Y + M + D + h + m + s;

  try {
    // メッセージの送信
    await client.replyMessage(replyToken, post);
    // DB保存（関数呼び出し）
    await dynamodb.putDynamoDB(dayTime, input_text, output_text);
  } catch (err) {
    console.log(err);
  }
};
