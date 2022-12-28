import type { Lists } from '.keystone/types';
import { user } from './src/domains/user/user';
import { drink } from './src/domains/drink/drink';

export const lists: Lists = {
  User: user,
  Drink: drink
}