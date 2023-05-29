Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Validação de funcionamento da API ViaCEP', () => {
    it('Verifica se API ViaCEP esta funcionando', () => {
        cy.request({
            method: 'GET',
            url: 'https://viacep.com.br/ws/30380010/json/'
        }).then((res) => {
            expect(res.status).to.be.equal(200);
        });
    });
})

describe('Validação de contrato da API ViaCEP', () => {

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

    it('Verifica se a resposta da API ViaCEP esta atendendo ao contrato estabelecido', () => {
        cy.request({
            method: 'GET',
            url: 'https://viacep.com.br/ws/30380010/json/'
        }).then((res) => {
            const validate = ajv.compile(schema);
            const valid = validate(res.body);
            expect(valid, ajv.errorsText(validate.errors)).to.be.true;
            expect(res.body).to.have.all.keys('cep', 'logradouro', 'complemento', 'bairro', 'localidade', 'uf', 'ibge', 'gia', 'ddd', 'siafi');
        });
    });
})

describe('Validação de integração da API ViaCEP', () => {
    it('Verifica se o retorno da API ViaCEP esta dentro do esperado', () => {
        cy.request({
            method: 'GET',
            url:`https://viacep.com.br/ws/30380010/json/`
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.have.property('cep', '30380-010');
            expect(res.body).to.have.property('logradouro', 'Rua Bernardo Mascarenhas');
            expect(res.body).to.have.property('complemento', '');
            expect(res.body).to.have.property('bairro', 'Cidade Jardim');
            expect(res.body).to.have.property('localidade', 'Belo Horizonte');
            expect(res.body).to.have.property('uf', 'MG');
            expect(res.body).to.have.property('ibge', '3106200');
            expect(res.body).to.have.property('gia', '');
            expect(res.body).to.have.property('ddd', '31');
            expect(res.body).to.have.property('siafi', '4123');
            }
        )
    })
})
