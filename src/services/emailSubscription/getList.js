import { select } from 'utils/db';

const subscriptionGetList = async req =>
  await select({
    table: 'subscription'
  });

export default subscriptionGetList;
