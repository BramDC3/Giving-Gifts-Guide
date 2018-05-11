describe('Voeg gift toe', () => {
    beforeEach(() => {
        cy.prepTest();
    });

    it('should be possible to add a gift with one category', () => {
        cy.login();

        cy.visit('gift/toevoegen');

        cy.get('[data-test=giftNaam]').type('Dit is een test');
        cy.get('[data-test=giftBeschrijving]').type('Ik hoop dat deze test van de eerste keer slaagt');
        cy.get('[data-test=giftPrijs]').type('123');

        [{naam: 'Boeken', soort: 'Normaal'}].forEach(
            categorie => {
                cy.get('[data-test=categorieNaam]').last().select(categorie.naam);
                cy.get('[data-test=categorieSoort]').last().select(categorie.soort);
            }
        );

        cy.get('[data-test=voegGiftToeBtn]').click();

        cy.get('[data-test=giftNaam]').should('be.empty');
    });

    it('should be possible to add a gift with multiple categories', () => {
        cy.login();

        cy.visit('gift/toevoegen');

        cy.get('[data-test=giftNaam]').type('Dit is een test');
        cy.get('[data-test=giftBeschrijving]').type('Ik hoop dat deze test van de eerste keer slaagt');
        cy.get('[data-test=giftPrijs]').type('123');

        const addElement = categorie => {
                cy.get('[data-test=categorieNaam]').last().select(categorie.naam);
                cy.get('[data-test=categorieSoort]').last().select(categorie.soort);
            };

        [
            {naam: 'Boeken', soort: 'Normaal'},
            {naam: 'Muziek', soort: 'Promotie'},
            {naam: 'Games', soort: 'Feestdag'},
        ].forEach(
            (categorie, index) => {
                addElement(categorie);
            }
        );

        cy.contains('Boeken');
        cy.contains('Normaal');
        cy.contains('Muziek');
        cy.contains('Promotie');
        cy.contains('Games');
        cy.contains('Feestdag');

        cy.get('[data-test=voegGiftToeBtn]').click();

        cy.get('[data-test=giftNaam]').should('be.empty');
    });
});
