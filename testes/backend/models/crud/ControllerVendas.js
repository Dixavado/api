const db = require('./db');

module.exports = {
    async insert(req, res) {
        let datas = {
            "nome": req.body.nome,
            "metodo": req.body.metodo,
            "produto": req.body.produto,
            "status": req.body.status
        }

        try {
            let response = await db.query('INSERT INTO vendas SET ?', [datas]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },
    async update(req, res) {
        let id = req.params.id;

        let datas = {
            "nome": req.body.nome,
            "metodo": req.body.metodo,
            "produto": req.body.produto,
            "status": req.body.status
        }

        try {
            let response = await db.query('UPDATE vendas SET ? WHERE id = ?', [datas, id]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },
    async findAll(req, res) {
        try {
            let response = await db.query('SELECT * FROM vendas');
            res.json(response[0]);
        } catch (error) {
            console.log(error);
        }
    },
    async findById(req, res) {
        let id = req.params.id;
        try {
            let response = await db.query(`SELECT * FROM vendas WHERE id = ${id}`);
            res.json(response[0]);
        } catch (error) {
            console.log(error);
        }
    },
    async delete(req, res) {
        let id = req.params.id;

        try {
            let response = await db.query(`DELETE FROM vendas WHERE id = ${id}`);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }
}