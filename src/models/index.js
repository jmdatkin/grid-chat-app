// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Room, UserRoom, User, Message } = initSchema(schema);

export {
  Room,
  UserRoom,
  User,
  Message
};