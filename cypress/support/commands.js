// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('openDeliverySignupForm', () => {
    cy.get('a[href="/deliver"]').click()
    cy.url().should('be.equal', 'https://buger-eats.vercel.app/deliver')
})

Cypress.Commands.add('fillPersonalData', (name, cpf, email, whatsapp) => {
    cy.get('input[name="name"]').type(name).should('have.value', name)
    cy.get('input[name="cpf"]').type(cpf).should('have.value', cpf)
    cy.get('input[name="email"]').type(email).should('have.value', email)
    cy.get('input[name="whatsapp"]').type(whatsapp).should('have.value', whatsapp)
})

Cypress.Commands.add('fillAddressData', (cep, addressNumber, addressDetails) => {
    cy.get('input[name="postalcode"]').type(cep).should('have.value', cep)
    cy.get('input[value="Buscar CEP"]').click()
    cy.get('input[name="address-number"]').type(addressNumber).should('have.value', addressNumber)
    cy.get('input[name="address-details"]').type(addressDetails).should('have.value', addressDetails)

    cy.get('input[name="address"]').should('have.value', 'Rua Bernardo Mascarenhas')
    cy.get('input[name="district"]').should('have.value', 'Cidade Jardim')
    cy.get('input[name="city-uf"]').should('have.value', 'Belo Horizonte/MG')
})

Cypress.Commands.add('selectDeliveryVehicleType',(vehicleType) => {
    cy.get(`span:contains(${vehicleType})`).click()
})

Cypress.Commands.add('uploadDeliveryPersonDocument',() => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/cnh-exemple.jpg', {force: true})
})

Cypress.Commands.add('submitDeliverySignupForm', () => {
    cy.get('.button-success').click()
    cy.get('.swal2-success-ring').should('be.visible')
    cy.get('H2:contains(Aí Sim...)').should('be.visible')
    cy.get('div:contains(Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.)').should('be.visible')
})