const express = require('express')
const session = require("express-session"); // SESSOES E COOKIES
const app = express()
const bcrypt = require('bcryptjs');
const cors = require("cors");
const jwt = require("jsonwebtoken");

// TOKEN
const secret = "ccleo"

// BODY PARSER E CORS
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// USANDO EJS PARA EXIBIR HTML
app.set('view engine', 'ejs');
app.use(express.static('public')); // Arquivos Estaticos ( CSS, IMG, etc... ) 


// CONFIG JSON
app.use(express.json())
    // CONFIG CORS
    // CORS
    // Add headers before the routes are defined
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8181');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// API ADMIN
const Admin = require('./models/users/Admin.js')
const { eAdmin } = require('./middlewares/adminAuth');
const User = require('./models/users/Users.js')
const { eUsers } = require('./middlewares/usersAuth');

app.use(express.json());

app.get('/', eAdmin, async(req, res) => {
    return res.json({
        erro: false,
        mensagem: "Listar usuários",
        id_usuario_logado: req.adminId
    });
});

app.post('/admin/cadastrar', async(req, res) => {
    console.log(req.body);
    let dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);
    await User.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuario Cadastrado"

            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Usuario nao Cadastrado"

            });
        })
})


app.post('/admin/login', async(req, res) => {

    const user = await User.findOne({
        attributes: ['id', 'nome', 'email', 'password'],
        where: {
            email: req.body.email
        }
    });

    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Login invalido!"
        });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! Senha incorreta!"
        });
    }

    var token = jwt.sign({ id: user.id }, "D62ST92Y7A6V7K5C6W9ZU6W8KS3", {

        //expiresIn: 600 //10 min
        //expiresIn: 60 //1 min
        expiresIn: '300' // 5 min
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});

// API USUARIO

app.use(express.json());

app.get('/', eAdmin, async(req, res) => {
    return res.json({
        erro: false,
        mensagem: "Listar usuários",
        id_usuario_logado: req.userId
    });
});


app.post('/login', async(req, res) => {

    const user = await User.findOne({
        attributes: ['id', 'nome', 'email', 'password'],
        where: {
            email: req.body.email
        }
    })

    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Login invalido!"
        });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! Senha incorreta!"
        });
    }

    var token = jwt.sign({ id: user.id, email: user.email }, "6271de7599f51ccleo1716271de8250f66", {

        //expiresIn: 600 //10 min
        //expiresIn: 60 //1 min
        expiresIn: '600' // 10 min
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});


//  API DE SISTEMA
var system = require('./models/system/sistema');
app.get('/system', eAdmin, async(req, res) => res.json(system))

// API DE INTERNET
// DOWNLOAD //
const getNetworkDownloadSpeed = require("./models/speedtest/down.js")

app.get('/down', eAdmin, async(req, res) => {
        let speedtest = await getNetworkDownloadSpeed()
        return res.json({ "resultado": speedtest })
    })
    // UPLOAD
const getNetworkUploadSpeed = require("./models/speedtest/down.js")

app.get('/upload', eAdmin, async(req, res) => {
    let upload = await getNetworkUploadSpeed()
    return res.json({ "resultado": upload })
})

// CRUD
const ControllerUsers = require('./models/crud/ControllerUsers');
const ControllerProd = require('./models/crud/ControllerProd');
const ControllerVendas = require('./models/crud/ControllerVendas');
//USUARIOS
app.post('/usuario/insert', ControllerUsers.insert);
app.put('/usuario/update/:id', ControllerUsers.update);
app.get('/usuarios', ControllerUsers.findAll);
app.get('/usuario/:id', ControllerUsers.findById);
app.delete('/usuario/:id', ControllerUsers.delete);
// PRODUTOS
app.get('/produtos', ControllerProd.findAll);
app.get('/produtos/:id', ControllerProd.findById);
app.post('/produtos/insert', ControllerProd.insert);
app.put('/produtos/update/:id', ControllerProd.update);

// VENDAS
app.get('/vendas', ControllerVendas.findAll);
app.get('/vendas/:id', ControllerVendas.findById);
app.post('/vendas/insert', ControllerVendas.insert);
app.put('/produvendastos/update/:id', ControllerVendas.update);


// SERVIDOR RODANDO
app.listen(3000, () => {
    console.log(`ᴀᴘɪㅤʀᴏᴅᴀɴᴅᴏ ɴᴀ ᴘᴏʀᴛᴀ 3000 💻`);
    console.log('');
    console.log('╭══ ✦ α∂ɱเɳㅤαρเ 🚀');
    console.log("|");
    console.log("|");
    console.log('| ɪɴғᴏㅤᴀᴘɪ  = ✅');
    console.log('| ᴄruᴅㅤᴀᴘɪ   = ✅');
    console.log('| ʟᴏɢɪɴㅤᴀᴘɪ = ❌');
    console.log('| coหรułтคร = ❌');
    console.log('| cнк       = ❌');
    console.log('');
    console.log('╰══ ✦ α∂ɱเɳㅤαρเ 🚀');
    console.log('');

});



console.log('')

const sequelize = require('./models/db/mysql')
console.log(sequelize.authenticate)