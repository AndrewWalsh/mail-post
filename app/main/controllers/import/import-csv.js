/**
 * @flow
 * Parses a CSV file and writes each email to a local db.
 */
import { getCurrentUser } from '../../utils';
import {
  csvIsValid,
} from './helpers';

export default async (csvPath: string) => { // eslint-disable-line
  const { username } = await getCurrentUser(); // eslint-disable-line
  try {
    await csvIsValid(csvPath);
  } catch (e) {
    return e;
  }
};
