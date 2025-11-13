import View from '../view/view.class.js';
import Books from '../model/books.class.js';
import Module from '../model/modules.class.js';
import Usuarios from '../model/users.class.js';

export default class Controller {
    constructor() {
        this.model = {
            libros: new Books(),
            modulos: new Module(),
            usuarios: new Usuarios()
        };
        this.view = new View();
    }

    async init() {
        this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
        this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));

        try {
            await Promise.all([
                this.model.libros.populate(),
                this.model.modulos.populate(),
                this.model.usuarios.populate()
            ]);
        } catch (error) {
            this.view.renderMessage("error", error);
            return;
        }

        this.view.renderModulesInSelect(this.model.modulos.data);
        this.model.libros.data.forEach(book => this.view.renderNewBook(book));
    }

    async handleSubmitBook(libro) {
        const pages = Number(libro.pages);
        const price = Number(libro.price);

        if (!Number.isInteger(pages) || pages < 0 ||
            !Number.isFinite(price) || price < 0) {
            this.view.renderMessage("error", "Datos inválidos");
            return;
        }
        try {
            const nuevoLibro = await this.model.libros.addBook(libro);

            if (!nuevoLibro) {
                this.view.renderMessage("error", "Error al añadir el libro");
                return;
            }

            this.view.renderNewBook(nuevoLibro);
            this.view.renderMessage("info", "Libro añadido correctamente");

        } catch (error) {
            this.view.renderMessage("error", error);
            return;
        }

    }

    async handleRemoveBook(idLibro) {
        try {
            const libroEliminado = await this.model.libros.removeBook(idLibro);

            if (!libroEliminado) {
                this.view.renderMessage("error", "El libro no existe");
                return false;
            }
            const lib = this.view.contenedorLibros.querySelector(`[data-id="${String(idLibro)}"]`);

            if (lib) lib.remove();
            this.view.renderMessage("info", "Libro eliminado correctamente");
            return true;
        } catch (error) {
            this.view.renderMessage("error", error);
            return false;
        }
    }
}
