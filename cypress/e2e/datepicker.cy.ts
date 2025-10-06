// https://on.cypress.io/api

describe('Tiqets Trip PLanner', () => {
  it('Tests the planner', () => {
    cy.visit('/')

    // Initial state, no products shown, city and date disabled
    cy.formFieldByLabel('City').should('be.disabled')

    // Wait for the datepicker to be rendered
    cy.contains('fieldset', 'Date').contains('button', 'Fri30')
    cy.contains('fieldset', 'Date').should('be.disabled')

    // A feedback message is shown when not all filters are selected
    cy.contains('Select filters first.').should('be.visible')

    cy.formFieldByLabel('Country').select('Italy')

    cy.formFieldByLabel('City').select('Rome')

    cy.contains('Fri30').click()

    // Feedback message is gone when all filters are selected
    cy.contains('Select filters first.').should('not.exist')

    // Check 1st and 4th card
    cy.get("[data-component='ProductCard']")
      .eq(0)
      .contains('Colosseum: Skip The Line + Arena Floor Access & Roman Forum')
      .contains('€30.00')

    cy.get("[data-component='ProductCard']")
      .eq(3)
      .contains('Vatican Museums & Sistine Chapel: Last Minute Ticket')
      .contains('€33.00')
      .contains('€49.25') // Prediscount price

    // Change city, date should reset
    cy.formFieldByLabel('City').select('Verona')

    cy.contains('Sat31').click()

    // Check 1st card, it should be updated
    cy.get("[data-component='ProductCard']")
      .eq(0)
      .contains('Gardaland Amusement Park Promotion: Skip The Ticket Line')
      .contains('€33.00')

    // Reset country should reset city and date
    cy.formFieldByLabel('Country').select('Choose the country')

    cy.contains('fieldset', 'Date').should('be.disabled')
    cy.formFieldByLabel('City').should('be.disabled')
  })
})
