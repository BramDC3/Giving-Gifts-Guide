import '../support/commands';

describe('Gift list', () => {
    beforeEach(() => {
        cy.prepTest();
        cy.login();

        const gift1 = {
            naam: 'Naam van de gift',
            categorieen: [
                {
                    naam: 'Boeken',
                    soort: 'Normaal',
                }
            ],
            prijs: '40',
            eigenaar: 'tester',
            aanmaakdatum: '2018-05-11T13:15:50.902Z'
        };
        const gift2 = {
            naam: 'Naam van tweede gift',
            categorieen: [
                {
                    naam: 'Boeken',
                    soort: 'Promotie',
                }
            ],
            prijs: '80',
            eigenaar: 'tester',
            aanmaakdatum: '2018-05-11T13:15:50.902Z'
        };

        cy.voegGiftToe(gift1);
        cy.voegGiftToe(gift2);
    });

    it('should show a list of gifts', () => {
        cy.visit('/');
        cy.get('[data-test=gift]').should('have.length', 2);
    });

    it('should be possible to like a gift', () => {
        cy.visit('');
        cy.get('[data-test=giftLikeBtn]').last().click();
        cy.contains('Aantal hartjes: 1');
    });
});
