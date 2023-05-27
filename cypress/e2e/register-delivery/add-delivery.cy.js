describe('acessar buger eats', () => {
    beforeEach(() => {
        cy.visit('https://buger-eats.vercel.app');
    })

    it('cadastrar entregador', () => {

        cy.get('a[href="/deliver"]').click()
        cy.url().should('be.equal', 'https://buger-eats.vercel.app/deliver')

        cy.get('input[name="name"]').type('Nome Completo Teste').should('have.value', 'Nome Completo Teste')
        cy.get('input[name="cpf"]').type('12277866628').should('have.value', '12277866628')
        cy.get('input[name="email"]').type('teste@uorak.com').should('have.value', 'teste@uorak.com')
        cy.get('input[name="whatsapp"]').type('88999990000').should('have.value', '88999990000')

        cy.get('input[name="postalcode"]').type('30380010').should('have.value', '30380010')
        cy.get('input[value="Buscar CEP"]').click()

        cy.get('input[name="address"]').should('have.value', 'Rua Bernardo Mascarenhas')
        cy.get('input[name="district"]').should('have.value', 'Cidade Jardim')
        cy.get('input[name="city-uf"]').should('have.value', 'Belo Horizonte/MG')
        cy.get('input[name="address-number"]').type('46').should('have.value', '46')
        cy.get('input[name="address-details"]').type('casa comercial').should('have.value', 'casa comercial')
        
        cy.get('.delivery-method > :nth-child(1)').click()
        cy.get('input[type=file]').selectFile('cypress/fixtures/cnh-exemple.jpg', {force: true})

        cy.get('.button-success').click()
        cy.get('.swal2-success-ring').should('be.visible')
        cy.get('H2:contains(Aí Sim...)').should('be.visible')
        cy.get('div:contains(Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.)').should('be.visible')
        
    })
})