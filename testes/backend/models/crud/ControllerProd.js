const db = require('./db');

module.exports = {
    async insert(req, res) {
        let datas = {
            "nome": req.body.nome,
            "valor": req.body.valor,
            "desc": req.body.desc
        }

        try {
            let response = await db.query('INSERT INTO produtos SET ?', [datas]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },
    async update(req, res) {
        let id = req.params.id;

        let datas = {
            "nome": req.body.nome,
            "valor": req.body.valor,
            "desc": req.body.desc
        }

        try {
            let response = await db.query('UPDATE produtos SET ? WHERE id = ?', [datas, id]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },
    async findAll(req, res) {
        try {
            let response = await db.query('SELECT * FROM produtos');
            res.json(response[0]);
        } catch (error) {
            console.log(error);
        }
    },
    async findById(req, res) {
        let id = req.params.id;
        try {
            let response = await db.query(`SELECT * FROM produtos WHERE id = ${id}`);
            res.json(response[0]);
        } catch (error) {
            console.log(error);
        }
    },
    async delete(req, res) {
        let id = req.params.id;

        try {
            let response = await db.query(`DELETE FROM users WHERE id = ${id}`);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }
}