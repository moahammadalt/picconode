import { select } from 'utils/db';

const emailUserGetList = async req =>
  await select({
    table: 'email_user'
  });

export default emailUserGetList;
