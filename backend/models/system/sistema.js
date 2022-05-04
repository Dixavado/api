// API DE CONSUMO DE INFORMAÇÔES DO SITEMA / VPS 

const os = require('os') // NodeJs OS


// CONSTANTES 
const freem = (os.freemem()/1024)/1024/1024
const totalmem = (os.totalmem()/1024)/1024/1024
const cpu = (os.cpus().length)
const so = (os.platform())
const host = (os.hostname())
const horas = (os.uptime()/60)/60
const dias = ((os.uptime()/60)/60)/24

//EXPORTANDO MODULO


var system = {
    host: host, 
    os: so,
    cpu: cpu,
    horas: horas + " Horas ativo",
    dias: dias + " Dias ativo",
    versao: os.version(),
    memoria: totalmem +' GB',
    usado : freem +' GB livres',
    uso: "% " + (freem/totalmem)*100
};



module.exports = system
