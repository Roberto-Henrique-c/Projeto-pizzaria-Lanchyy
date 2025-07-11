const fs = require('fs');
const path = require('path');

// Caminho para o arquivo CSV
const csvPath = path.join(__dirname, 'pessoas.csv');

// Função para ler e converter CSV em array de objetos
function carregarPessoas() {
    const dados = fs.readFileSync(csvPath, 'utf8');
    const linhas = dados.trim().split('\n');
    const cabecalho = linhas.shift().split(',');

    return linhas.map(linha => {
        const valores = linha.split(',');
        let obj = {};
        cabecalho.forEach((col, idx) => {
            obj[col] = valores[idx];
        });
        return obj;
    });
}

module.exports = carregarPessoas();

