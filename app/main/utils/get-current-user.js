// This is a dummy function to make it easier to add authentication in the future, if required.
import db from '../models';

export default async () => {
  const user = await db.User.find({
    where: {
      username: 'root',
    },
  });

  return user.get({ plain: true });
};
