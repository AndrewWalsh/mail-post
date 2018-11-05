export default ({ debug, importCsv, csvIsValid }) => async (csvPath, name) => {
  try {
    await csvIsValid(csvPath);
    debug(`${csvPath} is valid`);
    await importCsv(csvPath, name);
    debug(`${csvPath} imported`);
  } catch (e) {
    debug(`${e.message} error importing csv`);
    throw new Error(e);
  }
};
