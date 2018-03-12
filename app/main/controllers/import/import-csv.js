/**
 * @flow
 * Parses a CSV file and writes each email to a local db.
 */
import { getCurrentUser } from '../../utils';

export default async (csvPath: string) => { // eslint-disable-line
  const { username } = await getCurrentUser(); // eslint-disable-line
};
