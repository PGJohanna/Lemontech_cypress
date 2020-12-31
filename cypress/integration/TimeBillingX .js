describe("TimeBillingX menu test cases", function () {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
    cy.fixture("util.json").as("utilData");
    cy.visit("/");
    cy.get("@utilData").then((utilData) => {
      cy.loginUser(utilData.usuario, utilData.contraseña);
    });
  });

  it("Validate that Lemontech exists", function () {
    cy.get('.ui-administration > [href="#"]')
      .contains("Administration")
      .click();
    cy.get(".ui-clients > a").contains("Clients").click();
    cy.wait(2000);
    cy.get(".form-control").type("003").type("{enter}");
    cy.wait(2000);
    cy.get("tbody > tr > :nth-child(1)").contains("Lemontech");
    cy.get("tbody > tr > ._5HRyT").contains("000003");
  });

  it("Validate the creation of a new successful project", function () {
    cy.get('.ui-administration > [href="#"]')
      .contains("Administration")
      .click();
    cy.get(".ui-projects > a").contains("Projects").click();
    cy.wait(2000);
    cy.get(".add_project").contains("Add project").click();
    cy.wait(3000);
    cy.get("@utilData").then((utilData) => {
      cy.get("input[name='name']").type(utilData.proyecto);
    });
    cy.get(".col-md-9 > :nth-child(2) > .Select > .Select__control").type(
      "Lemontech"
    );
    cy.get(".Select__option").type("{enter}");
    cy.get("textarea[name='description']").type("Project for new QA position");
    cy.get(":nth-child(4) > ._3-pMq").click();
    cy.get("input[name='description']").type("project QA");
    cy.get("input[name='amount']").type("100");
    cy.get(".btn-primary").click({ force: true });
    cy.get(".Toastify__toast").contains("Project successfully saved");
    cy.wait(2000);
  });

  it("Validate that you can create a new time in the calendar", function () {
    cy.get('.ui-management > [href="#"]').contains("Management").click();
    cy.get(".ui-management > .dropdown-menu > :nth-child(1) > a")
      .contains("Calendar")
      .click();
    cy.wait(2000);
    cy.get("div[class='_29XL3']")
      .contains("Add time entry")
      .click({ force: true });
    cy.get("@utilData").then((utilData) => {
      cy.get("div[class='Select__input']")
        .type(utilData.proyecto)
        .type("{downarrow}")
        .type("{enter}");
      cy.get("textarea[name='description']").type(utilData.description);

      cy.get(
        ".TZRfK > ._2xG41 > .DZCpt > :nth-child(1) > ._3s-Zy > :nth-child(2)"
      ).type(utilData.hora);
      cy.get(".btn-primary").click();
      cy.wait(2000);
      cy.get("._38r9b").contains(utilData.description);
    });
  });

  it("Validate Report", function () {
    cy.get(".ui-reports > a").contains("Reports").click();
    cy.get(":nth-child(2) > .rDUuH").contains("Daily report").click();
    cy.wait(2000);
    cy.get("div[class='_3nBow _tABf']").contains("Johanna Palomino");
    cy.get("div[class='_3nBow _38PD9 _tABf']").contains("6h 00m");
  });
});
