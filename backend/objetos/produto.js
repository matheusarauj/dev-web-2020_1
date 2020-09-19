const fs = require('fs');

module.exports = class Produto {
  constructor(nome, unidade, id) {
    if ((nome === null) || (nome === undefined) || (nome.trim() === '')) {
      throw "Insira um nome Válido, que não seja Vazio."
    }
    if ((unidade === null) || (unidade === undefined) || !((unidade == 'cx') || (unidade == 'kg') || (unidade == 'und'))) {
      throw "Só são Aceitos os unidades 'cx', 'kg' e 'und'."
    }
    this.id = id;
    this.nome = nome;
    this.unidade = unidade;
  }
};

module.exports.produtos = JSON.parse(fs.readFileSync('./dados/produtos.json')) || [];

module.exports.writeprodutos = async produtos => {
  fs.writeFile('./dados/produtos.json', JSON.stringify(produtos), function read(err, data) {
    if (err) {
      throw err;
    }
  });
}

module.exports.findProdutosByNome = (query, produtos) => {
  let filterForStart = produtos.filter(obj => {
    if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
      return obj.nome.toLowerCase().startsWith(query.toLowerCase());
    } else {
      return false;
    }
  });

  let similar = produtos.filter(obj => {
    if (!((query === null) || (query === undefined) || (query.trim() === ''))) {
      return obj.nome.toLowerCase().indexOf(query.toLowerCase()) > -1;
    } else {
      return false;
    }
  });

  return [...new Set([...filterForStart, ...similar])];
}