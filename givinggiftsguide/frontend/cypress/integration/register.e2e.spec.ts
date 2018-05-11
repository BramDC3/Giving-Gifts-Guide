describe('Register', () => {
    beforeEach(() => {
        cy.prepTest();
    });

    it('register a new user', () => {
        cy.visit('/register');

        cy.get('[data-test=username]').type('BramDeConinck');
        cy.get('[data-test=password]').type('testtesttest');
        cy.get('[data-test=confirmPassword]').type('testtesttest');
        cy.get('[data-test=registerBtn]').click();

        cy.url().should('include', 'gift/list');
        cy.contains('BramDeConinck');
    });

    it('should not be possible to register if no fields are filled in', () => {
        cy.visit('/register');

        cy.get('[data-test=registerBtn]').should('be.disabled');
    });

    it('should test that all the pwds should be the same', () => {
        cy.visit('/register');

        cy.get('[data-test=username]').type('BramDeConinck');
        cy.get('[data-test=password]').type('testtesttest');
        cy.get('[data-test=confirmPassword]').type('whatever');

        // small trick to leave focus so the error message can popup
        cy.get('[data-test=username]').type('P');

        cy.get('[data-test=registerBtn]').should('be.disabled');
        cy.contains('De twee ingevoerde wachtwoorden komen niet overeen');
    });
});