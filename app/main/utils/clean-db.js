import db from '../models';

async function deleteAllUnfinishedLists() {
  try {
    await db.List.destroy({
      where: {
        finalised: false,
      },
    });
  } catch (e) {
    // Ignoring error - don't care if the Lists table doesn't exist
  }
}

export default async () => {
  await deleteAllUnfinishedLists();
};
