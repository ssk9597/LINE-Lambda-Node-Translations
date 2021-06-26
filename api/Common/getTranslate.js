// パッケージのインストール
const AWS = require('aws-sdk');

// 必要なAWSサービス
const translate = new AWS.Translate();

exports.getTranslate = (input, inLang, outLang) => {
  return new Promise((resolve, reject) => {
    // 必要なデータ
    const params = {
      Text: input,
      SourceLanguageCode: inLang,
      TargetLanguageCode: outLang,
    };

    // 翻訳を行う
    translate.translateText(params, (err, data) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        resolve(data);
      }
    });
  });
};
