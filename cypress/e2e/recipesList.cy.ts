describe("Recipes list", () => {
  it("creates new recipe by filling up form", () => {
    cy.visit("http://localhost:8888");
    cy.contains("h1", "List of recipes");
    cy.contains("button", "Add new recipe").click();
    cy.get("#title-field").type("cypress recipe title");
    cy.get("#description-field").type("cypress recipe description");
    cy.get("#instructions-field").type("cypress recipe instruction");
    cy.contains("button", "Add ingredient").click();
    cy.get("#1").type("cypress ingredient");
    cy.contains("button", "Create recipe").click();
    cy.contains(".v-card-title", "cypress recipe title");
  });
});
