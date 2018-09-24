import { browser, element, by } from 'protractor';
require('dotenv').config()

describe('Given a SDET learning protractor', () => {
  describe('when open Google Page', () => {
    beforeEach(() => {
      browser.get('https://www.logmein.com');
    });

    it('then push login button', () => {
      element(by.xpath('/html/body/div[1]/header/div/nav[2]/ul/li[2]/a')).click();
      element(by.id('email')).sendKeys(process.env.EMAIL);
      element(by.id('password')).sendKeys(process.env.PASSWORD);
      element(by.id('btnSubmit')).click();
      browser.get(`https://secure.logmein.com/mycomputers_preferences.asp?hostid=${process.env.HOSTEXAMPLE}&pcname=${process.env.PCNAME}`);
      var loc = by.xpath('//*[@id="IFrameInCenterPanel"]');
      var el = browser.driver.findElement(loc);
      browser.switchTo().frame(el).then(
        async () => {
          await element(by.linkText('Acceso directo de escritorio')).click();
          const link = await element(by.linkText(process.env.PCNAME)).getAttribute('href');
          console.log(link)
        }
      );
    });
  });
});