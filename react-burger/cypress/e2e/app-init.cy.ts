describe("App initialization", () => {
  it("loads ingredients on homepage", () => {
    cy.seedAndVisit();

    cy.get("[data-test='bun'] > div").should("have.length", 2);
    cy.get("[data-test='sauce'] > div").should("have.length", 4);
    cy.get("[data-test='main'] > div").should("have.length", 9);
  });
});