const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// Importando os arquivos JS externos
const imagens = require('./public/imagens_card.js');
const logo = require('./public/img_serv.js');
const texto = require('./public/texto.js');
const pessoas = require('./public/carregarPessoas.js');
const pizza_sal = require('./public/pizza-s.js');
const pagamentos = require('./public/pagamento.js')
const bebidas_s = require('./public/bebidas.js')
const pizzas_d  = require('./public/pizza_doce.js')

app.get('/', (req, res) => {
    res.render('index', { pessoas, imagens, texto, logo });
});

app.get('/pizzas-salgada', (req, res) => {
    res.render('pizza-s', { imagens, logo, pizza_sal});
});

app.get('/carrinho-compras', (req, res) => {
    res.render('carrinho', { pessoas, imagens, logo });
});

app.get('/pagamento', (req, res) => {
    res.render('pagamento', { pessoas, imagens, logo, pagamentos });
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro', { pessoas, imagens, logo});
});

app.get('/login', (req, res) => {
    res.render('login_r', { pessoas, imagens, logo});
});

app.get('/bebidas', (req, res) => {
    res.render('bebidas', { pessoas, imagens, logo, bebidas_s});
});

app.get('/pizzas_doce', (req, res) => {
    res.render('pizza_doce', { pessoas, imagens, logo, pizzas_d});
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


