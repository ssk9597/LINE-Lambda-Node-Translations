// パッケージのインストール
const AWS = require('aws-sdk');

// 必要なAWSサービス
const translate = new AWS.Translate();

exports.getTranslate = (input, inLang, outLang) => {
  return new Promise((resolve, reject) => {
    const params = {
      Text: input,
      SourceLanguageCode: inLang,
      TargetLanguageCode: outLang,
    };

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
