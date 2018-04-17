import { CSV_INVALID } from '../../lib/websocket';

export default ({ debug, importCsv, csvIsValid }) => async (csvPath, socket) => {
  try {
    await csvIsValid(csvPath);
  } catch (e) {
    debug(`${csvPath} is invalid`);
    socket.emit(CSV_INVALID, e);
    return;
  }

  try {
    debug(`${csvPath} is valid`);
    await importCsv(csvPath);
    debug(`${csvPath} imported`);
  } catch (e) {
    debug(`${e.message} error importing csv`);
  }
};
