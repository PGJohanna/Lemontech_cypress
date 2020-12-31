Cypress.Commands.add("loginUser", (username, password) => {
  cy.get("#user_email").type(username);
  cy.get("#user_password").type(password);
  cy.get(".btn").contains("Log In").click();
  cy.wait(4000);
});
