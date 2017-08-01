import { AngularContactListPage } from './app.po';

describe('angular-contact-list App', () => {
  let page: AngularContactListPage;

  beforeEach(() => {
    page = new AngularContactListPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
