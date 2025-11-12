import { View } from '../view/view.js'
import Books from '../model/books.class';
import Module from '../model/modules.class';
import Usuarios from '../model/users.class.js';

export class Controller {
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
            this.view.renderMessage("Error", error);
            return;
        }

        this.view.renderModulesInSelect(this.model.modulos.data);
        this.model.libros.data.forEach(book => this.view.renderNewBook(book));
    }

    handleSubmitBook(libro) {
        console.log("handleSubmitBook");
        console.log("[Controller] ✅ Libro recibido:", libro);
    }

    handleRemoveBook(libro) {
        console.log("handleRemoveBook");
        console.log("[Controller] 🗑️ Borrar libro ID:", libro);
    }
}
