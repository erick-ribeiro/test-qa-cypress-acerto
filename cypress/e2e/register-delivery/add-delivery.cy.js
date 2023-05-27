describe('CENARIOS POSITIVOS', () => {
    beforeEach(() => {
        cy.visit('https://buger-eats.vercel.app');
    })

    const user = require('../../fixtures/users.json')
    user.forEach(user => {
        it(`Registrar um Entregador de ${user.vehicle_type} com Sucesso`, () => {
            cy.openDeliverySignupForm()
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
        cy.visit('https://buger-eats.vercel.app');
    })

    const user = require('../../fixtures/users-error.json')
    user.forEach(user => {
        it(`Registrar um Entregador com Erro - ${user.type_error}`, () => {
            cy.openDeliverySignupForm()
            cy.fillPersonalData(user.name, user.cpf, user.email, user.whatsapp)
            cy.fillAddressData(user.cep, user.address_number, user.address_details)
            cy.selectDeliveryVehicleType(user.vehicle_type)
            cy.uploadDeliveryPersonDocument(user.document)
            cy.submitDeliverySignupForm(user.type_error)
        })
    })
})