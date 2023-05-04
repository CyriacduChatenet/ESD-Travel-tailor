describe('Travel', () => {
  beforeEach(() => {
    cy.login('test1@test.com', 'root')
  })

  it('should create a travel', () => {
    cy.wait(1000)
    cy.get('#nav-home').click()
    cy.get('#create-travel-departure-city').type('Paris, France')
    cy.get('.location-input').first().click()
    cy.get('#create-travel-destination-city').type('Bordeaux, Gironde, France')
    cy.get('.location-input').first().click()
    cy.get('#create-travel-departure-date').type('2023-09-08')
    cy.get('#create-travel-destination-date').type('2023-09-10')
    cy.wait(2000)
    cy.get('#create-travel-form').submit()
    cy.get('#traveler-dashboard').click()
    expect(cy.get('.card-title').contains(
        'Paris, France - Bordeaux, Gironde, France 08/09/2023 - 10/09/2023'
      ))
  })

    it('should delete a travel', () => {
        cy.wait(1000)
        cy.get('#travel-0 > .card-title').contains(
            'Bordeaux - Bordeaux, Gironde, France 25/12/2020 - 05/01/2021'
          )
        cy.get('#travel-0 > .delete-travel-btn').click()
        expect(cy.get('#travel-145').should('not.exist'))
    })
})
