//: Importa os módulos fs (File System)
const fs = require("fs");

//para lidar com operações de arquivo e geração de IDs aleatórios.
const crypto = require("crypto");

//O construtor da classe recebe um argumento filename, que é o nome do arquivo JSON onde os dados dos produtos
// serão armazenados. Ele verifica se o arquivo existe e cria um novo arquivo vazio com um array vazio se não existir.
class ProductRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Você precisa informar um nome de arquivo!!!");
    }
    this.filename = filename;

    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  //Este método lê o conteúdo do arquivo JSON, faz o parse dos dados em formato JSON e retorna a lista de produtos.
  async getAll() {
    const contents = await fs.promises.readFile(this.filename, {
      encoding: "utf-8",
    });
    const data = JSON.parse(contents);
    return data;
  }

  //Este método cria um novo produto. Ele gera um ID aleatório usando a função randomid(), lê os registros existentes,
  // adiciona o novo produto à lista e escreve os registros atualizados de volta no arquivo.
  async create(attributes) {
    attributes.id = this.randomid();
    const records = await this.getAll();
    records.push(attributes);
    await this.writeAll(records);
  }

  //Este método procura um produto específico com base no ID fornecido e o retorna.
  async getOne(id) {
    const records = await this.getAll();
    const product = records.find((record) => record.id === id);
    return product;
  }

  //Este método exclui um produto com base no ID fornecido. Ele lê os registros existentes, filtra o produto com o
  //ID especificado e escreve os registros atualizados de volta no arquivo.
  async delete(id) {
    const records = await this.getAll();
    const updatedList = records.filter((record) => record.id !== id);
    await this.writeAll(updatedList);
  }

  // Este método atualiza as informações de um produto com base no ID fornecido. Ele lê os registros existentes,
  //encontra o produto com o ID especificado, atualiza seus atributos com os novos valores e escreve os registros
  //atualizados de volta no arquivo.
  async update(id, attributes) {
    const records = await this.getAll();
    const productToUpdate = records.find((record) => record.id === id);

    if (!productToUpdate) {
      throw new Error(`Produto com ID ${id} não encontrado.`);
    }

    Object.assign(productToUpdate, attributes);
    await this.writeAll(records);
  }

  // Este método escreve uma lista de registros no arquivo JSON após converter os registros para formato JSON.
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  // Este método gera um ID aleatório usando a função crypto.randomBytes() e o converte para uma string hexadecimal.
  randomid() {
    return crypto.randomBytes(4).toString("hex");
  }
}

/* Define uma função de teste que cria uma instância do ProductRepository com o arquivo "products.json"
e realiza várias operações de teste: 
Cria dois produtos usando o método create.
Obtém a lista de todos os produtos e a imprime no console.
Obtém um produto específico com base no ID do primeiro produto da lista e, se 
encontrado, atualiza seu preço usando o método update.
Exclui o segundo produto
*/
const test = async () => {
  // Cria uma instância do UserRepository com o arquivo "users.json"
  const productRepo = new ProductRepository("products.json");

  //Criação de usuário
  await productRepo.create({ name: "Produto A", price: 10.99 });
  await productRepo.create({ name: "Produto B", price: 20.1 });

  // Obtém a lista de todos os usuários e a imprime no console.
  const products = await productRepo.getAll();
  console.log(products);

  const productToUpdate = await productRepo.getOne(products[0].id);
  if (productToUpdate) {
    await productRepo.update(productToUpdate.id, { price: 12.99 });
  }

  await productRepo.delete(products[1].id);

  const updatedProducts = await productRepo.getAll();
  console.log(updatedProducts);
};

//Chama a função teste
test();
