// @flow
import db from '../../../models';

export default (name: string) => db.List.create({ name });
