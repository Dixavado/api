const db = require('./db');

module.exports = {
    async insert(req, res) {
        let datas = {
            "nome": req.body.nome,
            "email": req.body.email,
            "senha": req.body.senha
        }

        try {
            let response = await db.query('INSERT INTO users SET ?', [datas]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },
    async update(req, res) {
        let id = req.params.id;

        let datas = {
            "nome": req.body.nome,
            "email": req.body.email,
            "senha": req.body.senha
        }

        try {
            let response = await db.query('UPDATE users SET ? WHERE id = ?', [datas, id]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },
    async findAll(req, res) {
        try {
            let response = await db.query('SELECT * FROM users');
            res.json(response[0]);
        } catch (error) {
            console.log(error);
        }
    },
    async findById(req, res) {
        let id = req.params.id;
        try {
            let response = await db.query(`SELECT * FROM users WHERE id = ${id}`);
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