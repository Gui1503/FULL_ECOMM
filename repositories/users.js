const fs = require("fs");

const cryoto = require("crypto");

class UserRepository {
  //Criar os métodos

  constructor(filename) {
    if (!filename) {
      throw new Error("VC precisa informar um nome de arquivo!!!");
    }
    //Propriedade da classe
    this.filename = filename;

    try {
      console.log("Arquivo já existe...");
      fs.accessSync(this.filename);
    } catch (error) {
      console.log("Criando Arquivo...");
      console.log(error);
      fs.writeFileSync(this.filename, "[]");
    }
  }
  //Criar métodos
  async getAll() {
    //Abrir o arquivo(this.filename)
    const contents = await fs.promises.readFile(this.filename);
    //fazer parse Json
    const data = JSON.parse(contents);

    //Ler o conteudo
    console.log(data);

    //Fazer um parse jason

    //retornar a lista

    return data;
  }

  async create(atributos) {
    //add o id atributo recebido
    atributos.id = this.randomid();

    //ler o meu arquivo
    const records = await this.getAll();
    //gravar no array records
    records.push(atributos);

    //devolver para um arquivo
    await this.writeAll(records);
  }

  async getOne(id) {
    //Lista todos usuários
    const records = await this.getAll();
    const searchUser = records.find((records) => (records.id = id));
    console.log(searchUser);
  }
  //Atividade
  async delete(id) {
    const records = await this.getAll();
    const updatedList = records.filter((record) => record.id !== id);
    await this.writeAll(updatedList);
  }

  async update(id, atributos) {
    //Pegar todos 
    const records = await this.getAll();

    //buscar o elemento
    const toUpdate = records.find((record) => record.id === id);

  
    // faz o update do objeto que eu quero
    Object.assign(toUpdate, atributos)

    await this.writeAll(records);


  }

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records));
  }

  randomid() {
    return cryoto.randomBytes(4).toString("hex");
  }
}

//Teste

const test = async () => {
  const repo = new UserRepository("users.json");
/* 
  await repo.create({ nome: "joão", email: "joão@gmail.com" });

  const users = await repo.getAll();

  console.log(users); */

  repo.update("277b2630" , {age:56, "nome":"Maria",nasc:"1996"});
  repo.update("f1530e2a" , {age:37, "nome":"Guilherme",nasc:"1986"});
};

test();
