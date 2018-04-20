export default ({ debug, importCsv, csvIsValid }) => async (csvPath, name) => {
  try {
    await csvIsValid(csvPath);
  } catch (e) {
    throw new Error(e);
  }

  try {
    debug(`${csvPath} is valid`);
    await importCsv(csvPath, name);
    debug(`${csvPath} imported`);
  } catch (e) {
    debug(`${e.message} error importing csv`);
  }
};
