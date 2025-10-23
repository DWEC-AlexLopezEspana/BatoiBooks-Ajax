import Users from './src/model/users.class.js';
import Books from './src/model/books.class.js';
import Modules from './src/model/modules.class.js';
const usuario = new Users();
const libro = new Books();
const modulo = new Modules();
usuario.populate();
libro.populate();
modulo.populate();
modulo.getModuleByCode("0439");

console.log(usuario);



