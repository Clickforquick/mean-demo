import { TallgrassPage } from './app.po';

describe('tallgrass App', () => {
  let page: TallgrassPage;

  beforeEach(() => {
    page = new TallgrassPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
