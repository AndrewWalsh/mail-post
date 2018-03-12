import {
  SELECTOR_NAV_CAMPAIGNS,
  SELECTOR_CAMPAIGN_IMPORT_CSV,
} from '../selectors';

describe('import csv', function spec() {
  beforeAll(() => {
    this.app = process.app;
    return process.app.start();
  });

  afterAll(() => process.app.stop());

  it('inserts csv into db when a csv is imported', async () => {
    const { client, browserWindow } = this.app;

    await client.waitUntilWindowLoaded();
    // console.log(await client.getUrl())
    await client.click(SELECTOR_NAV_CAMPAIGNS);
    await client.waitForExist(SELECTOR_CAMPAIGN_IMPORT_CSV);
    await client.click(SELECTOR_CAMPAIGN_IMPORT_CSV);
    await client.pause(5000);
    
    // expect(title).toBe('MailPost');
  });
});
