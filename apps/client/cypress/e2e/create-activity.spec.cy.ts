describe('Create activity', () => {
    beforeEach(() => {
        cy.login('test3@test.com','root');
    });

    it('should create an activity', () => {
        cy.get('#create-activity-link').click();
        cy.get('#create-activity-name').type('Test activity');
        cy.get('#create-activity-duration').type('2');
        cy.get('#create-activity-location').type('Bordeaux, Gironde, France');
        // cy.url().should('include', '/advertiser-dashboard');
    });
});