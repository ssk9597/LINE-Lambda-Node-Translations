// パッケージのインストール
const AWS = require('aws-sdk');

// 必要なAWSサービス
const dynamodb = new AWS.DynamoDB();

exports.putDynamoDB = (dayTime, input, output) => {
  return new Promise((resolve, reject) => {
    const params = {
      Item: {
        timestamp: {
          S: dayTime,
        },
        input_text: {
          S: input,
        },
        output_text: {
          S: output,
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: 'translations_history',
    };

    dynamodb.putItem(params, (err, data) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        resolve();
      }
    });
  });
};
