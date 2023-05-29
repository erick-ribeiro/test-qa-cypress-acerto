# Projeto de Testes em Cypress para Vaga de QA - Aplicativo Buger Eats

## Sobre
Este repositório contém testes automatizados para o aplicativo Buger Eats. Os testes foram criados utilizando o framework Cypress como parte de um teste para uma vaga de QA na empresa Acerto.

## Estrutura do Repositório
O repositório consiste nas seguintes partes principais:

- `fixtures`: Esta pasta contém dados de apoio para os testes.
- `support`: Esta pasta contém comandos customizados para facilitar a leitura e reaproveitamento de codigo.
- `tests`: Esta pasta contém os arquivos de tests.
    - `api`: Esta pasta contém testes de API
    - `ui`: Esta pasta contém testes executados na interface do usuário.

## Pre requisitos para execução

Tenha o node e o cypress instalados na máquina
Link para instalação (https://docs.cypress.io/guides/getting-started/installing-cypress.html#Direct-download)

```bash
# Clone este repositório
$ git clone https://github.com/erick-ribeiro/test-qa-cypress-acerto.git
```

```bash
# Instale as dependecias
$ npm install
```

## Como Executar os Testes

A execução pode ser feita via linha de comando ou via interface grafica do cypress.


```bash
# Através do proprio framework:
$ npx cypress open
```

```bash
# Através da linha de comando:
$ npx cypress run
```
