import { getGreeting } from '../support/app.po';

describe('frontend', function () {
  beforeEach(function () {
    return cy.visit('/');
  });

  it('should display welcome message', function () {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome frontend');
  });
});
