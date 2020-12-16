// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare global {
   namespace Cypress {
      interface Chainable {
         /**
          * Get Workflow XML through XHR call
          * @memberof Cypress.Chainable
          * @param wfPath
          */
         getTodo: (index: number) => Cypress.Chainable;
         addTodo: (text: string) => Cypress.Chainable;
      }
   }
}
Cypress.Commands.add("addTodo", (text: string) => {
   cy.get("#add-input").type(`${text}{enter}`);
});

Cypress.Commands.add("getTodo", (index: number) => {
   cy.get("#todos").children().eq(index);
});
Cypress.Commands.add("getByTestId", (testId: string) => {
   cy.get(`*[data-testid=${testId}]`);
});
export const x = 3;
