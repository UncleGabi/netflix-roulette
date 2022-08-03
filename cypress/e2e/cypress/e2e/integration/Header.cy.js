describe("Header component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/search");
  });

  it("renders the Home page", () => {
    cy.get(".app").should("exist");
  });

  it("should shouw '?title=st' when it is searched for in the search input", () => {
    cy.get("input").type("st");
    cy.get("input").should("have.value", "st");
    cy.get("#search").should("exist");
    cy.get("#search").click();
    cy.url().should("include", "st");
  });

  it("should show the id of the movie in the url", () => {
    cy.get("div").contains("Fifty").should("exist");
    cy.get("div").contains("Fifty").click();
    cy.url().should("contain", "337167");
    cy.get("div").contains("Fifty Shade").should("exist");
  });

  it("should navigate back to all the movies when magnifier is clicked", () => {
    cy.get("div").contains("Fifty ").should("exist");
    cy.get("div").contains("Fifty ").click();
    cy.get(".movie-data__header svg").should("exist");
    cy.get(".movie-data__header svg").click();
    cy.url().should("equal", "http://localhost:3000/search");
  });
});
