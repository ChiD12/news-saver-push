import { MongoClient, WithId, Document } from 'mongodb';
import { Push, PushInput, PushRepo } from './interfaces/interfaces';

export const createPushRepo = (client: MongoClient): PushRepo => {
  const insertPush = async (push: PushInput) => {
    const database = client.db('news');
    const articles = database.collection('push');
    // create a document to insert

    const doc = {
      userId: push.userId,
      message: push.message,
      sentFromDeviceId: push.sentFromDeviceId,
      deviceType: push.deviceType,
      datePosted: new Date()
    };
    const result = await articles.insertOne(doc);
    console.log(`A document was upserted with the _id: ${result.insertedId}`);
  };

  const fetchAllPushs = async () => {
    const database = client.db('news');
    const pushs = database.collection('push');
    const query = {};
    const fetchedDocuments = await pushs.find(query).toArray();

    const fetchedPushs: Push[] = fetchedDocuments.map((doc: WithId<Document>) => {
      return {
        id: doc.id,
        userId: doc.userId,
        message: doc.message,
        sentFromDeviceId: doc.sentFromDeviceId,
        deviceType: doc.deviceType,
        datePosted: doc.datePosted.toUTCString()
      };
    });

    console.log(fetchedPushs);
    return fetchedPushs;
  };

  const fetchPushsFromUser = async (userId: string) => {
    const database = client.db('news');
    const pushs = database.collection('push');
    const query = {
      userId
    };
    const fetchedDocuments = await pushs.find(query).toArray();

    const fetchedPushs: Push[] = fetchedDocuments.map((doc: WithId<Document>) => {
      return {
        id: doc.id,
        userId: doc.userId,
        message: doc.message,
        sentFromDeviceId: doc.sentFromDeviceId,
        deviceType: doc.deviceType,
        datePosted: doc.datePosted.toUTCString()
      };
    });

    console.log(fetchedPushs);
    return fetchedPushs;
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

  return { insertPush, fetchAllPushs, fetchPushsFromUser };
};
