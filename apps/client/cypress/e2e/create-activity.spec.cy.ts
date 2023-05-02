describe('Create activity', () => {
    beforeEach(() => {
        cy.login('test3@test.com','root');
    });

    it('should create an activity', () => {
        cy.get('#create-activity-link').click();
        cy.get('#create-activity-name').type('Test activity');
        cy.get('#create-activity-duration').type('2');
        cy.get('#create-activity-location').type('Bordeaux, Gironde, France');
        cy.get('#create-tag-input').type('Hockey sur Glace');
        cy.get('#create-opening-hour-input').type('09:00');
        cy.get('#create-closing-hour-input').type('12:00');
        cy.get('#create-closing-day-input').type('2023-12-31');
        cy.get('#create-activity-date-recurence').check();
        cy.get('#add-tag-btn').click();
        cy.get('#add-schedule-btn').click();
        cy.get('#add-closing-day-btn').click();
        cy.get('#create-activity-form').submit();
        // cy.url().should('include', '/advertiser-dashboard');
    });
});