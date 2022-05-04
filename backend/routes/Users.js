const express = require('express');
const app = express();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { eAdmin } = require('./middlewares/auth');

app.use(express.json());

app.get('/', eAdmin, async (req, res) => {
    return res.json({
        erro: false,
        mensagem: "Listar usuários",
        id_usuario_logado: req.userId
    });
});

app.post('/cadastrar', async (req, res) => {
    //$2a$08$pFdQsDmR8Dlk3X9pw5kIve4n7/RtUytgpKn5pi8bs66Xh2odOtWVW
    const password = await bcrypt.hash("123456", 8);

    //console.log(password);

    return res.json({
        erro: false,
        mensagem: "Cadastrar usuário"
    });
});

app.post('/login', async (req, res) => {
    //console.log(req.body);

    if(req.body.email != "cesar@celke.com.br"){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! E-mail incorreto!"
        });
    }

    if(!(await bcrypt.compare(req.body.password, "$2a$08$pFdQsDmR8Dlk3X9pw5kIve4n7/RtUytgpKn5pi8bs66Xh2odOtWVW"))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! Senha incorreta!"
        });
    }

    var token = jwt.sign({id: 1}, "D62ST92Y7A6V7K5C6W9ZU6W8KS3", {
        //expiresIn: 600 //10 min
        //expiresIn: 60 //1 min
        expiresIn: '7d' // 7 dia
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});