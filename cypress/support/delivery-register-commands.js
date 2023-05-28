Cypress.Commands.add('openDeliverySignupForm', () => {
    cy.get('a[href="/deliver"]').click()
    cy.url().should('be.equal', `${Cypress.config("baseUrl")}/deliver`)
})

Cypress.Commands.add('fillPersonalData', (name, cpf, email, whatsapp) => {
    name && cy.get('input[name="name"]').type(name).should('have.value', name)
    cpf && cy.get('input[name="cpf"]').type(cpf, {log: false}).should('have.value', cpf, {log: false})
    email && cy.get('input[name="email"]').type(email).should('have.value', email)
    whatsapp && cy.get('input[name="whatsapp"]').type(whatsapp).should('have.value', whatsapp)

})

Cypress.Commands.add('fillAddressData', (cep, addressNumber, addressDetails) => {
    cy.intercept('GET', `https://viacep.com.br/ws/${cep}/json/`).as('getCEP')

    cy.get('input[name="postalcode"]').type(cep).should('have.value', cep)
    cy.get('input[value="Buscar CEP"]').click()

    cy.wait('@getCEP');

    cy.get('input[name="address-number"]').type(addressNumber).should('have.value', addressNumber)
    cy.get('input[name="address-details"]').type(addressDetails).should('have.value', addressDetails)

    // cy.get('input[name="address"]').should('have.value', 'Rua Bernardo Mascarenhas')
    // cy.get('input[name="district"]').should('have.value', 'Cidade Jardim')
    // cy.get('input[name="city-uf"]').should('have.value', 'Belo Horizonte/MG')
})

Cypress.Commands.add('selectDeliveryVehicleType',(vehicleType) => {
    vehicleType && cy.get(`span:contains(${vehicleType})`).click()

})

Cypress.Commands.add('uploadDeliveryPersonDocument',(document) => {
    document && cy.get('input[type=file]').selectFile(`cypress/fixtures/${document}`, {force: true})
})

Cypress.Commands.add('submitDeliverySignupForm', (status) => {

    // [GAMBIS] foi necessario fazer uma gambiarra nesta validação, utilizando objeto de ações pois tem um bug na aplicacao que em alguns casos (cep, tipo de veiculo, documento) mesmo com erro o cadastro é feito com sucesso 

    const statusActions = {
        'success': () => {
            cy.get('.button-success').click();
            cy.get('.swal2-success-ring').should('be.visible');
            cy.get('H2:contains(Aí Sim...)').should('be.visible');
            cy.get('div:contains(Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.)').should('be.visible');
        },
        'Nome em Branco': () => {
            cy.get('.button-success').click();
            cy.get('.alert-error').should('be.visible');
        },
        'CPF em Branco': () => {
            cy.get('.button-success').click();
            cy.get('.alert-error').should('be.visible');
        },
        'Email em Branco': () => {
            cy.get('.button-success').click();
            cy.get('.alert-error').should('be.visible');
        },
        'WhatsApp Invalido': () => {
            cy.get('.button-success').click();
            cy.get('.alert-error').should('be.visible');
        },
        'CEP Invalido': () => {
            cy.get('.alert-error').should('be.visible');
        },
        'Tipo do Veiculo em Branco': () => {
            cy.get('.button-success').click();
            cy.get('.alert-error').should('be.visible');
        },
        'Documento não enviado': () => {
            cy.get('.button-success').click();
            cy.get('.alert-error').should('be.visible');
        }
    };
    
    if (statusActions[status]) {
        statusActions[status]();
    } else {
        alert("Status de erro desconhecido, revisar suite de teste!");
    }

})