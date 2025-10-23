import * as BookApi from '../services/books.api.js';
import Book from './book.class.js';
export default class Books {
    constructor() {
        this.data = [];
    }
    async populate() {
        try {
            let libros = await BookApi.getDBBooks();

            this.data = libros.map(libro => new Book(libro));
            console.log(this.data);

        } catch (error) {
            console.log("Error al cargar todos los datos en el array");
            throw error;
        }

    }
    async addBook(libroAnyadir) {
        try {
            let libroNuevo = await BookApi.addDBBook(libroAnyadir);
            let libro = new Book(libroNuevo);
            this.data.push(libro);
            console.log("Libro añadido y sincronizado localmente", libro);
            return libro;
        } catch (error) {
            console.log("Error al añadir el libro: ", error);
        }
    }

    async removeBook(idLibro) {
        try {
            await BookApi.removeDBBook(idLibro);
            this.data = this.data.filter(libro => libro.id !== idLibro);
            console.log("Libro borrado");
        } catch (error) {
            console.log("Error al borrar el libro", error);
            throw error;
        }
    }

    async changeBook(libroActualizar) {
        try {
            let libroModificado = await BookApi.changeDBBook(libroActualizar);
            let libro = new Book(libroModificado);

            this.data = this.data.map(lib => lib.id === libroActualizar.id ? libro : lib);
            console.log("Libro modificado", libro);
            return libro;
        } catch (error) {
            console.log("Error al cambiar datos de los libro ", error);
            throw error;
        }

    }

     getBookById(idLibro) {

        try {
            let libro = this.data.find(lib => lib.id === idLibro);
            if (!libro) throw new Error();
            return new Book(libro);
        } catch (error) {
            console.error("Error al buscar el libro por su ID:", error);
            throw new Error(error);
        }
        /*        try {
                    let libro = await BookApi.getDBBook(idLibro);
                    if (!libro) throw new Error();
                    return new Book(libro);
                } catch (error) {
                    console.error("Error al buscar el libro por su ID:", error);
                    throw new Error(error);
                }*/
    }


    /*Preguntar si se tienen que cambiar*/
    getBookIndexById(bookId) {
        let indiceLibro = this.data.findIndex(lib => lib.id === bookId);
        if (indiceLibro === -1) throw new Error("Lorbo no encontrado por su ID mediante Index");
        return indiceLibro;
    }

    bookExists(userId, moduleCode) {
        return this.data.some(lib => lib.userId === userId && lib.moduleCode === moduleCode)
    }
    booksFromUser(userId) {
        return this.data.filter(lib => lib.userId === userId);
    }

    booksFromModule(moduleCode) {
        return this.data.filter(lib => lib.moduleCode === moduleCode);
    }

    booksCheeperThan(price) {
        return this.data.filter(lib => lib.price <= price);
    }

    booksWithStatus(status) {
        return this.data.filter(lib => lib.status === status);

    }

    averagePriceOfBooks() {
        if (this.data.length === 0) return "0.00 €";
        return (this.data.reduce((total, libprice) => total += libprice.price, 0) / this.data.length).toFixed(2) + " €";

    }

    booksOfTypeNotes() {
        let libType = this.data.filter(lib => lib.publisher === "Apunts");
        if (libType.length === 0) return [];
        return libType;
    }

    booksNotSold() {
        let lista = this.data.filter(lib => !lib.soldDate);
        if (lista.length === 0) return [];
        return lista;
    }

    incrementPriceOfbooks(percentage) {
        if (percentage < 0) throw new Error("Error, porcentaja inferior a 0");
        return this.data.map(lib => ({ ...lib, price: +(lib.price * percentage).toFixed(2) }));
    }

    toString() {
        if (this.data.length === 0) return [];
        return this.data.map(user => user.toString()).join("\n")
    }
}