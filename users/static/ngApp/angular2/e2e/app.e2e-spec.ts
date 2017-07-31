import { Angular2Page } from './app.po';

describe('angular2 App', () => {
  let page: Angular2Page;

  beforeEach(() => {
    page = new Angular2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
