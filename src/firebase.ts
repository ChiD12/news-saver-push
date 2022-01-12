const FCM = require('fcm-node');

export const sendPushToFirebase = async (msg: string, id: string) => {
  const serverKey = process.env.FIREBASE_KEY;
  const fcm = new FCM(serverKey);

  const message = {
    to: id,
    notification: {
      title: 'Push Received',
      body: msg
    },

    data: {
      title: 'ok cdfsdsdfsd',
      body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
    }
  };

  fcm.send(message, (err: string, response: string) => {
    if (err) {
      console.log(`Something has gone wrong: ${err}`);
      console.log(`Response: ${response}`);
    } else {
      console.log('Successfully sent with response: ', response);
    }
  });
};
