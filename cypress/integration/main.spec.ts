describe("The main test", () => {
   beforeEach(() => {
      cy.visit("/");
   });
   it("deletes todos", () => {
      const texts = ["Wake up", "Run", "Sleep"];
      cy.addTodo(texts[0]).addTodo(texts[1]).addTodo(texts[2]);
      cy.getTodo(1).find(".delete-btn").click();
      cy.get("#todos").children().should("have.length", 2);
      cy.get("#todos").should("not.have.text", texts[1]);
   });
   it("adds new todo", () => {
      const texts = ["Wake up", "Run", "Sleep"];
      cy.addTodo(texts[0]).should("have.value", "");
      cy.get("#todos").children().should("have.length", 1);
      cy.getTodo(0).should("have.text", texts[0]);

      cy.addTodo(texts[1]).addTodo(texts[2]).should("have.value", "");
      cy.get("#todos").children().should("have.length", 3);
      cy.getTodo(1).should("have.text", texts[1]);
      cy.getTodo(2).should("have.text", texts[2]);
   });
   it("edits and saves todo", () => {
      const texts = ["Wake up", "Run", "Sleep"];
      cy.addTodo(texts[0]).addTodo(texts[1]).addTodo(texts[2]);
      cy.getTodo(1).find(".edit-btn").click();
      cy.getTodo(1).find(".edit-btn").should("not.exist");
      cy.getTodo(1).should("have.class", "active");
      cy.getTodo(1).find(".save-edit-btn").should("be.visible");
      cy.getTodo(1).find(".edit-input").type("123");
      cy.getTodo(1).find(".save-edit-btn").click();
      cy.getTodo(1)
         .should("have.text", texts[1] + "123")
         .should("not.have.class", "active")
         .find(".edit-btn")
         .should("exist");
      cy.getTodo(1).find(".save-edit-btn").should("not.exist");
   });
});

export const x = 3;
