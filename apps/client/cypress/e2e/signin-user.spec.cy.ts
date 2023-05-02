describe('Signin User', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin');
    });

    it('should signin traveler', () => {
        cy.get('#email-signin').type('test10@test.com').trigger('change');
        cy.get('#password-signin').type('root').trigger('change');
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/traveler/dashboard');
    });

    it('should signin advertiser', () => {
        cy.get('input[name="email"]').type('test3@test.com').trigger('change');
        cy.get('input[name="password"]').type('root').trigger('change');
        cy.get('input[type="submit"]').click();
        cy.url().should('include', '/advertiser/dashboard');
    });
});