describe('Comment', () => {
    beforeEach(() => {
        cy.login('test1@test.com','root')
    });

    it('should create a comment', () => {
        cy.get('#activity-link').click()
        cy.get('p').contains('Patinoire').click()
        cy.get('#comment-input').type('Ceci est un commentaire')
        cy.get('#comment-form').submit()
    });
});