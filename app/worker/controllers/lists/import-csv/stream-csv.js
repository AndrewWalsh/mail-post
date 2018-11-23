const pauseHandler = (buffer, minBufferSize, readStream) => {
  if (buffer.length >= minBufferSize) readStream.pause();
  else if (readStream.isPaused()) readStream.resume();
};

export default (readStream, writeStream, minBufferSize) => {
  // No. emails to hold in memory
  // Will be of at least length minBufer, but max length is not guaranteed
  // Readstream watermark needs to meet max bytes of a line in the csv
  const buffer = [];
  let totalLines = 0;
  let ended = false;
  readStream
    .pipe(writeStream)
    .on('data', (data) => {
      totalLines += 1;
      buffer.push(data);
      pauseHandler(buffer, minBufferSize, readStream);
    })
    .on('error', (e) => { throw new Error(e); })
    .on('end', () => { ended = true; });

  const splice = () => {
    if (buffer.length > minBufferSize) return buffer.splice(0, minBufferSize);
    return buffer.splice(0, (minBufferSize - (minBufferSize - buffer.length)));
  };

  const getLines = () => new Promise(function resolver(resolve) {
    if (!ended && buffer.length < minBufferSize) return setTimeout(() => resolver(resolve), 100);
    if (ended) return resolve(splice());
    if (readStream.isPaused()) {
      const spliced = splice();
      pauseHandler(buffer, minBufferSize, readStream);
      return resolve(spliced);
    }
    return resolve(splice());
  });

  const getTotal = () => totalLines;
  const hasEnded = () => ended;

  return {
    getLines,
    getTotal,
    hasEnded,
    minBufferSize,
  };
};
