import db from '../models';

async function deleteAllUnfinishedLists() {
  try {
    await db.List.destroy({
      where: {
        finalised: false,
      },
    });
  } catch (e) {
    // Ignoring error (if the table doesn't exist)
  }
}

async function deleteAllUnfinishedSubscribers() {
  try {
    await db.Subscriber.destroy({
      where: {
        finalised: false,
      },
    });
  } catch (e) {
    // Ignoring error (if the table doesn't exist)
  }
}

export default async () => {
  await deleteAllUnfinishedLists();
  await deleteAllUnfinishedSubscribers();
};
