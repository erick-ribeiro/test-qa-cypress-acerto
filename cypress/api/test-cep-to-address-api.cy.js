describe('Verificar API de consulta de CEP', () => {

    const cep = require('../fixtures/cep.json')
    cep.forEach(cep => {
        it('buscar CEP', () => {
            cy.request({
                method: 'GET',
                url:`https://viacep.com.br/ws/${cep.cep}/json/`
            }).then((res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property('cep', '30380-010')
                }
            )
        })
    })

})

// {
//     "cep": "30380-010",
//     "logradouro": "Rua Bernardo Mascarenhas",
//     "complemento": "",
//     "bairro": "Cidade Jardim",
//     "localidade": "Belo Horizonte",
//     "uf": "MG",
//     "ibge": "3106200",
//     "gia": "",
//     "ddd": "31",
//     "siafi": "4123"
//   }