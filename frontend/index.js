// *******************************
// API CCLEO DESIGN BY DIXAVADO  *
// *******************************

// CONFIG EXPRESS
const express = require("express"); // Importando
const app = express(); // Executando
// CORS
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

// BODY PARSER 
const bodyParser = require("body-parser");


// USANDO EJS PARA EXIBIR HTML
app.set('view engine', 'ejs');
app.use(express.static('public')); // Arquivos Estaticos ( CSS, IMG, etc... ) 

// CONFIG BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIG SERVIDOR EXPRESS
app.listen(80, function(erro) { // Executando servidora na porta 8080
    if (erro) {
        console.log("Erro!")
    } else {

        console.log("╭══ ✦ α∂ɱเɳㅤαρเ 🚀")
        console.log("|")
        console.log("| ᴀᴘɪ       = ✅")
        console.log("| ᴘᴀɪɴᴇʟ    = ✅")
        console.log("|")
        console.log("╰══ ✦ α∂ɱเɳㅤαρเ 🚀")
        console.log("")
    }
})

// DATABASE


// ROTAS DO SERVIDOR

// PAGINA INICIAL
app.get("/", function(req, res) {
    res.render("index")
});

app.get("/cad", function(req, res) {
    res.render("admin/cad")
});


// PAINEL
app.get("/admin", function(req, res) {
    res.render("admin/index")
});
// PAINEL
app.get("/admin/users", function(req, res) {
    res.render("admin/users")
});

// POSTAGEM
app.get("/admin/post", function(req, res) {
    res.render("post")
});

// WIKI
app.get("/wiki", function(req, res) {
    res.send("Wiki")
});