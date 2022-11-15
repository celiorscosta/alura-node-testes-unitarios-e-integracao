import { describe, expect, it, jest } from '@jest/globals';
import Editora from '../../models/editora';

describe('Testando o modelo editora', () => {
    const objEditora = {
        nome: 'CDC',
        cidade: 'São Paulo',
        email: 'c@c.com'
    };

    it('Deve instanciar uma nova editora', () => {
        const editora = new Editora(objEditora);

        expect(editora).toEqual(
            expect.objectContaining(objEditora),
        );
    });

    it.skip('Deve salvar editora no bd', () => {
        const editora = new Editora(objEditora);

        editora.salvar().then((dados) => {
            expect(dados.nome).toBe('CDC');
        });
    });

    it.skip('Deve salvar no BD salvando a sintax moderna', async () => {
        const editora = new Editora(objEditora);
        const dados = await editora.salvar();

        const ret = await Editora.pegarPeloId(dados.id);
        expect(ret).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            })
        );
    });

    it('Deve fazer uma chamada simulada ao BD', () => {
        const editora = new Editora(objEditora);
        editora.salvar = jest.fn().mockReturnValue({
            id: 9999,
            nome: 'CDC',
            cidade: 'São Paulo',
            email: 'c@c.com',
            created_at: '2022-10-01',
            updated_at: '2022-10-01'
        });

        const ret = editora.salvar();

        expect(ret).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            })
        );
    });
});
