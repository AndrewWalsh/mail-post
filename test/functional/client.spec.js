jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

describe('main window', function spec() {
  beforeAll(() => {
    this.app = process.app;
    return process.app.start();
  });

  afterAll(() => process.app.stop());

  it('the application name is "MailPost"', async () => {
    const { client, browserWindow } = this.app;

    await client.waitUntilWindowLoaded();
    const title = await browserWindow.getTitle();
    expect(title).toBe('MailPost');
  });

  it('there are no console logs in main window', async () => {
    const { client } = this.app;
    const logs = await client.getRenderProcessLogs();
    logs.forEach((log) => {
      console.log(log.message);
      console.log(log.source);
      console.log(log.level);
    });
    expect(logs).toHaveLength(0);
  });
});
