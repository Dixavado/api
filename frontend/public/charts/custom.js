// PUXANDO DADOS JSON DA API COM FECTH
fetch('http://localhost:3000/down').then(res => {
    return res.json()
}).then(corpo => {
    // TESTANDO
    //console.log(corpo.resultado.mbps)
    document.getElementById("download").innerHTML = corpo.resultado.mbps
    document.getElementById("downloadd").innerHTML = corpo.resultado.mbps
})

// PUXANDO DADOS JSON DA API COM FECTH
fetch('http://localhost:3000/upload').then(res => {
    return res.json()
}).then(corpo => {
    // TESTANDO
    //console.log(corpo.resultado.mbps)
    document.getElementById("upload").innerHTML = corpo.resultado.mbps
})