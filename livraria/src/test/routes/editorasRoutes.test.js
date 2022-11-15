import { afterEach, beforeEach, expect, jest } from '@jest/globals';
import app from '../../app';
import request from 'supertest';

let server;
//Hook
beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

//Hook
afterEach(() => {
    server.close();
});

describe('Get em /editoras', () => {
    it('Deve retornar uma lista de editoras', async () => {
        const res = await request(app).get('/editoras')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body[0].email).toEqual('e@e.com')
    })
});

let idResposta;
describe('POST em /editoras', () => {
    it('Deve adicionar uma nova editora', async () => {
        const res = await request(app)
            .post('/editoras')
            .send({
                nome: 'CDC',
                cidade: 'São Paulo',
                email: 'c@c.com'
            })
            .expect(201);

        idResposta = res.body.content.id;
    });

    it('Deve não adicionar nada ao passar o body vazio', async () => {
        await request(app)
            .post('/editoras')
            .send({})
            .expect(400);
    });
});

describe('Get em /editoras', () => {
    it('Deve retornar o recurso adicionado', async () => {
        await request(app)
            .get(`/editoras/${idResposta}`)
            .expect(200);
    });
});

describe('PUT em /editoras/id', () => {
    test.each([
        ['nome', { nome: 'Casa do Código' }],
        ['cidade', { cidade: 'Sorocaba' }],
        ['email', { email: 'cdc@cdc.com' }],
    ])('Deve alterar o campo %s', async (chave, param) => {
        const requisicao = { request };
        const spy = jest.spyOn(requisicao, 'request');

        await requisicao.request(app)
            .put(`/editoras/${idResposta}`)
            .send(param)
            .expect(204);

        expect(spy).toHaveBeenCalled();
    });
});

describe('Delete em /editoras', () => {
    it('Deletar o recurso adicionado', async () => {
        await request(app)
            .delete(`/editoras/${idResposta}`)
    });
});
