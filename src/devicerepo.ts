import { MongoClient, WithId, Document } from 'mongodb';
import { Device, DeviceInput, DeviceRepo } from './interfaces/interfaces';

export const createDeviceRepo = (client: MongoClient): DeviceRepo => {
  const insertDevice = async (device: DeviceInput) => {
    const database = client.db('news');
    const devices = database.collection('device');
    const options = { upsert: true };

    const filter = {
      externalDeviceId: device.externalDeviceId,
      userId: device.userId
    };

    const insertFilter: any = {
      $set: {
        deviceType: device.deviceType,
        userId: device.userId,
        externalDeviceId: device.externalDeviceId
      }
    };
    // if (device.deviceType === 'android') insertFilter.androidDeviceId = device.androidDeviceId;
    const result = await devices.updateOne(filter, insertFilter, options);
    console.log(`A document was upserted with the _id: ${result.upsertedId}`);
  };

  const fetchAllDevices = async () => {
    const database = client.db('news');
    const devices = database.collection('device');
    const query = {};
    const fetchedDocuments = await devices.find(query).toArray();

    const fetchedDevices: Device[] = fetchedDocuments.map((doc: WithId<Document>) => {
      return { id: doc.id, userId: doc.userId, deviceType: doc.deviceType, externalDeviceId: doc.externalDeviceId };
    });

    console.log(fetchedDevices);
    return fetchedDevices;
  };

  const fetchUserDevices = async (userId: string) => {
    const database = client.db('news');
    const devices = database.collection('device');
    const query = { userId };
    const fetchedDocuments = await devices.find(query).toArray();

    const fetchedDevices: Device[] = fetchedDocuments.map((doc: WithId<Document>) => {
      return { id: doc.id, userId: doc.userId, deviceType: doc.deviceType, externalDeviceId: doc.externalDeviceId };
    });

    console.log(fetchedDevices);
    return fetchedDevices;
  };

  const getUser = async () => {
    const database = client.db('news');
    const movies = database.collection('user');
    // Query for a movie that has the title 'Back to the Future'
    const query = {
      name:
        'fqPbK7AHQre2MgspsYolYF:APA91bGgPno3WJV29atuPYiJbcimZgFynBpXZR5Kt22Zf-CPdWNYY4w6R2ua-6-GkWpOZgr4iky1c9tWH_f9EXghzVNQvMpYScmaeuAA1qHKV_SuX7lMsbLhGE0TeBdLlMPQXlWPDjnl'
    };
    const user = await movies.findOne(query);

    console.log(user);
    return user;
  };

  return { insertDevice, fetchAllDevices, fetchUserDevices };
};
