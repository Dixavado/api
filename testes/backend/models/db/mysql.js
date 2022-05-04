const Sequelize = require('sequelize')

const sequelize = new Sequelize('u268200671_login', 'u268200671_ccleo', 'Sahali1!', {
    host: '185.211.7.52',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log("╭══ ✦ ᴍʏsǫʟ 📦")
        console.log("|")
        console.log("|   sτατυs  ✅")
        console.log("|")
        console.log("╰══ ✦ ᴍʏsǫʟ 📦")

    }).catch((error) => {
        console.log(error);
    })


//Postagem.sync({ force: true })
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}