describe('Create Advertiser', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('should visit signup page', () => {
        cy.get('a[href*="signin"]').click();
        cy.get('a[href*="signup"]').click();
    });

    it('should create a new advertiser', () => {
        cy.visit('http://localhost:3000/signup');
        cy.get('#username-signup-input').type('test41');
        cy.get('#email-signup-input').type('test41@test.com');
        cy.get('#password-signup-input').type('root');
        cy.get('#role-selector').select('advertiser');
        cy.get('input[type="submit"]').click();
    });
});