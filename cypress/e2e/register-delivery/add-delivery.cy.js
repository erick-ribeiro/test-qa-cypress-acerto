describe('acessar buger eats', () => {
    beforeEach(() => {
        cy.visit('https://buger-eats.vercel.app');
    })

    it('cadastrar entregador', () => {

        cy.get('a[href="/deliver"]').click()
        cy.url().should('be.equal', 'https://buger-eats.vercel.app/deliver')

        cy.inputData('Nome Completo Teste', '12277866628', 'teste@uorak.com', '88999990000')
        cy.inputAddress('30380010')
        cy.inputTypeDelivery()
        cy.submitDelivery()
    })
})