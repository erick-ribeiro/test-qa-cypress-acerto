describe('acessar buger eats', () => {
    beforeEach(() => {
        cy.visit('https://buger-eats.vercel.app');
    })

    const user = require('../../fixtures/users.json')
    user.forEach(user => {
        it('cadastrar entregador com sucesso', () => {

            cy.get('a[href="/deliver"]').click()
            cy.url().should('be.equal', 'https://buger-eats.vercel.app/deliver')
    
            cy.inputData(user.name, user.cpf, user.email, user.whatsapp)
            cy.inputAddress('30380010')
            cy.inputTypeDelivery()
            cy.submitDelivery()

        })
    })
})