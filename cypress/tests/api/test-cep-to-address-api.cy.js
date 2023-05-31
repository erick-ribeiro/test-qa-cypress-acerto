describe('Validação de funcionamento da API ViaCEP', function() {
    it('Verifica se API ViaCEP esta funcionando', function() {
        cy.api({
            method: 'GET',
            url: 'https://viacep.com.br/ws/30380010/json/'
        }).should(function(response) {
            expect(response.status).to.be.equal(200);
        });
    });
})

describe('Validação de contrato da API ViaCEP', function() {

    const Ajv = require('ajv');
    const ajv = new Ajv();

    const schema = {
        type: 'object',
        properties: {
            cep: { type: 'string' },
            logradouro: { type: 'string' },
            complemento: { type: 'string' },
            bairro: { type: 'string' },
            localidade: { type: 'string' },
            uf: { type: 'string' },
            ibge: { type: 'string' },
            gia: { type: 'string' },
            ddd: { type: 'string' },
            siafi: { type: 'string' }
        },
        required: ['cep', 'logradouro', 'bairro', 'localidade', 'uf', 'ibge', 'ddd', 'siafi'],
        additionalProperties: false
    };

    it('Verifica se a responseposta da API ViaCEP esta atendendo ao contrato estabelecido', function() {
        cy.api({
            method: 'GET',
            url: 'https://viacep.com.br/ws/30380010/json/'
        }).should(function(response) {
            const validate = ajv.compile(schema);
            const valid = validate(response.body);
            expect(valid, ajv.errorsText(validate.errors)).to.be.true;
            expect(response.body).to.have.all.keys('cep', 'logradouro', 'complemento', 'bairro', 'localidade', 'uf', 'ibge', 'gia', 'ddd', 'siafi');
        });
    });
})

describe('Validação de integração da API ViaCEP', function() {
    it('Verifica se o retorno da API ViaCEP esta dentro do esperado', function() {
        cy.api({
            method: 'GET',
            url:`https://viacep.com.br/ws/30380010/json/`
        }).should(function(response) {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.property('cep', '30380-010');
            expect(response.body).to.have.property('logradouro', 'Rua Bernardo Mascarenhas');
            expect(response.body).to.have.property('complemento', '');
            expect(response.body).to.have.property('bairro', 'Cidade Jardim');
            expect(response.body).to.have.property('localidade', 'Belo Horizonte');
            expect(response.body).to.have.property('uf', 'MG');
            expect(response.body).to.have.property('ibge', '3106200');
            expect(response.body).to.have.property('gia', '');
            expect(response.body).to.have.property('ddd', '31');
            expect(response.body).to.have.property('siafi', '4123');
            }
        )
    })
})
