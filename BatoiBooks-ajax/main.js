import Users from './src/model/users.class.js';
import Books from './src/model/books.class.js';
import Modules from './src/model/modules.class.js';
const usuario = new Users();
const libro = new Books();
const modulo = new Modules();
usuario.populate();
libro.populate();
modulo.populate();
const booksFromModule5021 = books.booksFromModule(5021);
    console.log(booksFromModule5021.toString());

const newBooks = books.booksByStatus('new');
    console.log(newBooks.toString());

 for (const book of books.data) {
      book.price = parseFloat((book.price * 1.1).toFixed(2));
      // Actualizar en la BBDD (opcional según enunciado, pero coherente con persistencia)
      await books.changeBook(book);
    }
    console.log(books.toString());


