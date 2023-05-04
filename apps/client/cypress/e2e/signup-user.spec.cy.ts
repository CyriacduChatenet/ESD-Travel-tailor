describe('Signup user', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signup');
    });

    it('should create an advertiser', () => {
        const number = Math.floor(Math.random() * 1000000);

        cy.get('#username-signup-input').type(`test${number}`);
        cy.get('#email-signup-input').type(`test${number}@test.com`);
        cy.get('#password-signup-input').type('root');
        cy.get('#role-selector').select('advertiser');
        cy.get('#signup-form').submit();
        cy.get('#create-advertiser-name').type(`test${number}`);
        cy.get('#create-advertiser-location').type(`Bordeaux, Gironde, France`);
        cy.get('#create-advertiser-form').submit();
    });

    // it('should create a traveler', () => {
    //     const number = Math.floor(Math.random() * 1000000);
        
    //     cy.get('#username-signup-input').type(`test${number}`);
    //     cy.get('#email-signup-input').type(`test${number}@test.com`);
    //     cy.get('#password-signup-input').type('root');
    //     cy.get('#role-selector').select('traveler');
    //     cy.get('#signup-form').submit();
    //     cy.get('#create-taste-name').type(`Patinoire`);
    //     cy.get('#create-taste-form').submit();
    //     cy.get('#add-taste').click();
    // });
});