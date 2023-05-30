Cypress.Commands.add('fillPersonalData', (name, cpf, email, whatsapp) => {
    name && cy.get('input[name="name"]').type(name, { delay: 0}).should('have.value', name);
    cpf && cy.get('input[name="cpf"]').type(cpf, {log: false, delay: 0}).should('have.value', cpf, {log: false});
    email && cy.get('input[name="email"]').type(email, { delay: 0}).should('have.value', email);
    whatsapp && cy.get('input[name="whatsapp"]').type(whatsapp, { delay: 0}).should('have.value', whatsapp);
})

Cypress.Commands.add('fillAddressData', (cep, addressNumber, addressDetails) => {
    cep && cy.intercept('GET', `https://viacep.com.br/ws/${cep}/json/`).as('getCEP');

    cep && cy.get('input[name="postalcode"]').type(cep, { delay: 0}).should('have.value', cep);
    cy.get('input[value="Buscar CEP"]').click();
    
    cep && cy.wait('@getCEP');

    addressNumber && cy.get('input[name="address-number"]').type(addressNumber, { delay: 0}).should('have.value', addressNumber);
    addressDetails && cy.get('input[name="address-details"]').type(addressDetails, { delay: 0}).should('have.value', addressDetails);
})

Cypress.Commands.add('selectDeliveryVehicleType',(vehicleType) => {
    if (Array.isArray(vehicleType)) {
        vehicleType.forEach((vehicleType) => {
            cy.contains('.delivery-method li', vehicleType).click();
        });


    } else if (vehicleType) {
        cy.contains('.delivery-method li', vehicleType).click();
    }
})

Cypress.Commands.add('uploadDeliveryPersonDocument',(document) => {
    document && cy.get('input[type=file]').selectFile(`cypress/fixtures/${document}`, {force: true});
})

Cypress.Commands.add('submitDeliverySignupForm', (status) => {
    const deliverySignupSubmitButton = '.button-success';
    const formErrorAlertField = '.alert-error';

    const actionForCurrentFormStatus = {
        'success': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.get('.swal2-success-ring').should('be.visible');
            cy.contains('H2', 'Aí Sim...').should('be.visible');
            cy.contains('div', 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato').should('be.visible');
        },
        'Nome em Branco': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'É necessário informar o nome').should('be.visible');
        },
        'CPF em Branco': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'É necessário informar o CPF').should('be.visible');
        },
        'CPF Invalido': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'Oops! CPF inválido').should('be.visible');
        },
        'Email em Branco': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'É necessário informar o email').should('be.visible');
        },
        'WhatsApp Invalido': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'Oops! Whatsapp com formato incorreto').should('be.visible');
        },
        'CEP Invalido': () => {
            cy.contains(formErrorAlertField, 'Informe um CEP válido').should('be.visible');
        },
        'CEP em Branco': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'É necessário informar o CEP').should('be.visible');
        },
        'Numero em Branco': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'É necessário informar o número do endereço').should('be.visible');
        },
        'Tipo do Veiculo em Branco': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'Selecione o método de entrega').should('be.visible');
        },
        'Selecionando dois Tipos de Veiculos': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'Oops! Selecione apenas um método de entrega').should('be.visible');
        },
        'Documento não enviado': () => {
            cy.contains(deliverySignupSubmitButton, 'Cadastre-se para fazer entregas').click();
            cy.contains(formErrorAlertField, 'Adicione uma foto da sua CNH').should('be.visible');
        }
    };
    
    if (actionForCurrentFormStatus[status]) {
        actionForCurrentFormStatus[status]();
    } else {
        alert("Status de erro desconhecido, revisar suite de teste!");
    }
})