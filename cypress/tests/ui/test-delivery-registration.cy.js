describe('CENARIOS POSITIVOS', () => {
    beforeEach(() => {
        cy.visit('/deliver')
    })
    const user = require('../../fixtures/user-positive-scenarios.json')
    user.forEach(user => {
        it(`Registrar um Entregador de ${user.vehicle_type} com Sucesso`, () => {
            cy.fillPersonalData(user.name, user.cpf, user.email, user.whatsapp)
            cy.fillAddressData(user.cep, user.address_number, user.address_details)
            cy.selectDeliveryVehicleType(user.vehicle_type)
            cy.uploadDeliveryPersonDocument('cnh-exemple.jpg')
            cy.submitDeliverySignupForm('success')
        })
    })
})

describe('CENARIOS NEGATIVOS', () => {
    beforeEach(() => {
        cy.visit('/deliver')
    })
    const user = require('../../fixtures/user-negative-scenarios.json')
    user.forEach(user => {
        it(`Registrar um Entregador com Erro - ${user.type_error}`, () => {
            cy.fillPersonalData(user.name, user.cpf, user.email, user.whatsapp)
            cy.fillAddressData(user.cep, user.address_number, user.address_details)
            cy.selectDeliveryVehicleType(user.vehicle_type)
            cy.uploadDeliveryPersonDocument(user.document)
            cy.submitDeliverySignupForm(user.type_error)
        })
    })
})