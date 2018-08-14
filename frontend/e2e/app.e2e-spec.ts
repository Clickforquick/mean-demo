import { InstMgmtPage } from './app.po';

describe('inst-mgmt App', () => {
  let page: InstMgmtPage;

  beforeEach(() => {
    page = new InstMgmtPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
