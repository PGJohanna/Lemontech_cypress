describe("Validate login", function () {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
    cy.fixture("util.json").as("utilData");
    cy.visit("/");
    cy.clearCookies();
  });

  it("Validate correct login", function () {
    cy.get("@utilData").then((utilData) => {
      cy.loginUser(utilData.usuario, utilData.contraseña);
    });
  });

  it("Validate layout", function () {
    cy.get(".login-logo").should("not.be.disabled");
    cy.get(".login-title").contains("Welcome to TimeBillingX");
    cy.get(".alert").contains(
      "You need to sign in or sign up before continuing."
    );
    cy.get(":nth-child(5) > :nth-child(1)").contains("Email");
    cy.get("#user_email").should("have.attr", "placeholder", "Email");
    cy.get(":nth-child(6) > label").contains("Password");
    cy.get("#user_password").should("have.attr", "placeholder", "Password");
    cy.get(".remember-me-check > label").contains("Remember me");
    cy.get("a").contains("Forgot password?");
    cy.get(".btn").should("not.be.disabled");
  });
});
