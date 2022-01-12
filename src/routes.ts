import * as express from 'express';
import jwt from 'jsonwebtoken';
import { celebrate, Segments } from 'celebrate';
import { MongoClient } from 'mongodb';

import { deviceSchema, pushSchema } from './schema/schema';
import { createPushService } from './services';
import { createPushRepo } from './pushrepo';
import { createDeviceRepo } from './devicerepo';
import { PushInput, DeviceInput } from './interfaces/interfaces';
import { articleListener, deviceListener } from './messageQReceiver';

export const router = express.Router();
// const validator = createValidator();

const uri = process.env.MONGO_CONNECTION;
const client = new MongoClient(uri!);
client.connect();
const deviceRepo = createDeviceRepo(client);
const service = createPushService(createPushRepo(client), deviceRepo);

articleListener(deviceRepo);
deviceListener(deviceRepo);

const middleware = (scheme: any) => {
  const func: any = [];
  if (scheme !== null) {
    func.push(celebrate({ [Segments.BODY]: scheme }));
  }
  func.push((req: any, res: any, next: any) => {
    const { message, userId, sentFromDeviceId, token } = req.body;
    if (!token) return res.status(403).send('A token is required');
    try {
      const decoded = jwt.verify(req.body.token, process.env.JWT_KEY!);
      console.log(decoded);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }

    next();
  });

  return func;
};

router.post('/push', middleware(pushSchema), async (req, res, next) => {
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
