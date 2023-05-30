/// <reference types="Cypress" />

describe('CENARIOS POSITIVOS', function() {
    beforeEach(function() {
        cy.visit('/deliver');
        cy.title().should('be.equal', 'Buger Eats')
    })
    const user = require('../../fixtures/user-positive-scenarios.json')
    user.forEach(user => {
        it(`Registrar um Entregador de ${user.vehicle_type} com Sucesso`, function() {
            cy.fillPersonalData(user.name, user.cpf, user.email, user.whatsapp);
            cy.fillAddressData(user.cep, user.address_number, user.address_details);
            cy.selectDeliveryVehicleType(user.vehicle_type);
            cy.uploadDeliveryPersonDocument(user.document);
            cy.submitDeliverySignupForm('success');
        })
    })
})

describe('CENARIOS NEGATIVOS', function() {
    beforeEach(function() {
        cy.visit('/deliver');
        cy.title().should('be.equal', 'Buger Eats')

    })
    
    const user = require('../../fixtures/user-negative-scenarios.json')
    user.forEach(user => {
        it(`Registrar um Entregador com Erro - ${user.type_error}`, function() {
            cy.fillPersonalData(user.name, user.cpf, user.email, user.whatsapp);
            cy.fillAddressData(user.cep, user.address_number, user.address_details);
            cy.selectDeliveryVehicleType(user.vehicle_type);
            cy.uploadDeliveryPersonDocument(user.document);
            cy.submitDeliverySignupForm(user.type_error);
        })
    })
})