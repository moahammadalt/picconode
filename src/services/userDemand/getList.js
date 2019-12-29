import { select } from 'utils/db';

const userDemandList = async req =>
  await select({
    table: 'user_demand'
  });

export default userDemandList;
