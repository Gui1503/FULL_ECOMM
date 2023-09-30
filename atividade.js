const array = [-1, -2, -3, 2, 4, 6, 7, 8, 10, 12, 17];
nPositivos(array);

function nPositivos(result) {
  for (const i of result) {
    if (i > 0) {
      console.log(i);
    }
  }
}

function maiorValor(array) {
  let maior = array[0];

  for (const i of array) {
    if (i > maior) {
      maior = i;
    }
  }

  return maior;
}

const maior = maiorValor(array);
console.log("Maior valor:", maior);

function maiorString(strings) {
  let maior = "";

  for (const str of strings) {
    if (str.length > maior.length) {
      maior = str;
    }
  }

  return maior;
}

const nomes = ["João", "Maria", "José", "Ana", "Francisco"]; // Substitua pelo array de nomes que você tem
const maiorNome = maiorString(nomes);
console.log("Maior string:", maiorNome);

function somaPositivos(array) {
  let soma = 0;

  for (const numero of array) {
    if (numero > 0) {
      soma += numero;
    }
  }

  return soma;
}

const resultadoSoma = somaPositivos(array);
console.log("Soma dos números positivos:", resultadoSoma);
