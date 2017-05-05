import { MaconsoWebPage } from './app.po';

describe('maconso-web App', () => {
  let page: MaconsoWebPage;

  beforeEach(() => {
    page = new MaconsoWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
