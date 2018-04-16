// @flow
import db from '../../../../main/models';

export default (name: string) => db.List.create({ name });
