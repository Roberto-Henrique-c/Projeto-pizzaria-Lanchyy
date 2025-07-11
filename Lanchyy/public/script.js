exis

document.addEventListener('DOMContentLoaded', () => {
  const botoesAdicionar = document.querySelectorAll('.btn-adicionar');

  botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
      const card = botao.closest('.card');
      const nome = card.querySelector('.card-title').textContent.trim();

      let precoTexto = '';

      // Primeiro tenta o seletor original que funciona para pizzas
      const precoElem = card.querySelector('.card-subtitle p:last-child');

      if (precoElem) {
        precoTexto = precoElem.textContent.trim();
      } else {
        // Se não encontrar, tenta o seletor para bebidas
        const precoBebidaElem = Array.from(card.querySelectorAll('.card-subtitle'))
          .find(p => p.textContent.includes('R$'));
        precoTexto = precoBebidaElem ? precoBebidaElem.textContent.trim() : '';
      }

      const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));

      adicionarAoCarrinho(nome, preco);
    });
  });

  if (document.getElementById('lista-carrinho')) {
    atualizarCarrinho();
  }
});

function adicionarAoCarrinho(pizza, preco) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  carrinho.push({ pizza, preco});
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  atualizarCarrinho(); // Atualiza se tiver carrinho visível
}

function limparCarrinho() {
  localStorage.removeItem('carrinho');
  window.location.reload();
}

function atualizarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const lista = document.getElementById('lista-carrinho');
  const totalElemento = document.getElementById('total');

  if (!lista || !totalElemento) return;

  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.pizza} - R$ ${item.preco.toFixed(2).replace('.', ',')}`;
    lista.appendChild(li);
    total += item.preco;
  });

  totalElemento.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (carrinho.length === 0) {
    return;
  }

  let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  localStorage.removeItem('carrinho');
  atualizarCarrinho();
}

// Pagamento
function mostrarCartao() {
  document.getElementById('cartao-info').style.display = 'block';
  document.getElementById('pix-info').style.display = 'none';
}

function mostrarPix() {
  document.getElementById('cartao-info').style.display = 'none';
  document.getElementById('pix-info').style.display = 'block';

  const valor = JSON.parse(localStorage.getItem('carrinho'))?.reduce((acc, item) => acc + item.preco, 0) || 0;
  const chavePix = "189.680.286-99";
  const dados = `Pagamento Lanchyy Pizzaria\nValor: R$${valor.toFixed(2)}\nChave Pix: ${chavePix}`;

  const qrImg = document.getElementById("qr-pix");
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(dados)}`;
  document.getElementById("valor-pix").textContent = `Total: R$ ${valor.toFixed(2).replace('.', ',')}`;
}

function confirmarPagamento() {
  alert("Pagamento via Pix confirmado! Obrigado pela compra.");
  localStorage.removeItem('carrinho');
  atualizarCarrinho();
}
