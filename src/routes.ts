import * as express from 'express';

import { celebrate, Segments } from 'celebrate';
import { MongoClient } from 'mongodb';

import { deviceSchema, pushSchema } from './schema/schema';
import { createPushService } from './services';
import { createPushRepo } from './pushrepo';
import { createDeviceRepo } from './devicerepo';
import { PushInput, DeviceInput } from './interfaces/interfaces';
import { articleListener, deviceListener } from './messageQReceiver';

export const router = express.Router();

const uri = process.env.MONGO_CONNECTION;
const client = new MongoClient(uri!);
client.connect();
const deviceRepo = createDeviceRepo(client);
const service = createPushService(createPushRepo(client), deviceRepo);

articleListener(deviceRepo);
deviceListener(deviceRepo);

router.post('/push', celebrate({ [Segments.BODY]: pushSchema }), async (req, res, next) => {
  const push = req.body as PushInput;
  await service.postPush(push);
  res.status(204).send();
  next();
});

router.get('/push', async (req, res, next) => {
  const allPushs = await service.getAllPushs();
  res.status(200).json(allPushs);
  next();
});

router.post('/device', celebrate({ [Segments.BODY]: deviceSchema }), async (req, res, next) => {
  const device = req.body as DeviceInput;
  await service.postDevice(device);
  res.status(204).send();
  next();
});

router.get('/device', async (req, res, next) => {
  const allDevices = await service.getAllDevices();
  res.status(200).json(allDevices);
  next();
});
