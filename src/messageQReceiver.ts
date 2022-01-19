import { sendPush } from './services';
import { DeviceRepo } from './interfaces/interfaces';

const amqp = require('amqplib/callback_api');

export const articleListener = (deviceRepo: DeviceRepo) => {
  amqp.connect(process.env.RMQ, (error0: any, connection: any) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1: any, channel: any) => {
      if (error1) {
        throw error1;
      }

      const queue = 'sendPush_Queue';

      channel.assertQueue(queue, {
        durable: true
      });

      console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

      channel.consume(
        queue,
        (msg: any) => {
          const msgString = msg.content.toString();
          console.log(' [x] Received %s', msgString);
          const obj = JSON.parse(msgString);
          sendPush(obj.docLink, obj.userId, deviceRepo);

          console.log('[x] Done');
          channel.ack(msg);
        },
        {
          noAck: false
        }
      );
    });
  });
};

export const deviceListener = (deviceRepo: DeviceRepo) => {
  amqp.connect('amqp://localhost', (error0: any, connection: any) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1: any, channel: any) => {
      if (error1) {
        throw error1;
      }

      const queue = 'sendDevice_Queue';

      channel.assertQueue(queue, {
        durable: true
      });

      console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

      channel.consume(
        queue,
        (msg: any) => {
          const msgString = msg.content.toString();
          console.log(' [x] Received %s', msgString);
          const obj = JSON.parse(msgString);
          if (!obj.updateDevice) {
            deviceRepo.insertDevice(obj.device);
          } else {
            // TODO update device
          }

          console.log('[x] Done');
          channel.ack(msg);
        },
        {
          noAck: false
        }
      );
    });
  });
};
