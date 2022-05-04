const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
    eUsers: async function(req, res, next) {
        const authHeader = req.headers.authorization;
        //console.log(authHeader);
        if (!authHeader) {
            return res.status(400).json({
                erro: true,
                mensagem: "API PRIVADA, Faça login para prosseguir!"
            });
        }

        const [, token] = authHeader.split(' ');
        //console.log("Token: " + token);

        if (!token) {
            return res.status(400).json({
                erro: true,
                mensagem: "API PRIVADA, Faça login para prosseguir!Token inválido!"
            });
        }

        try {
            const decode = await promisify(jwt.verify)(token, "ccleo171");
            req.userId = decode.id;
            return next();
        } catch (err) {
            return res.status(400).json({
                erro: true,
                mensagem: "API PRIVADA, Faça login para prosseguir! Token inválido!"
            });
        }

    }
}