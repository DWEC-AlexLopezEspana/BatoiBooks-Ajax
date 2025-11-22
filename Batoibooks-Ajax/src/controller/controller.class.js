import View from '../view/view.class.js';
import Books from '../model/books.class.js';
import Module from '../model/modules.class.js';
import Usuarios from '../model/users.class.js';
import Card from '../model/cart.class.js';

export default class Controller {
    constructor() {
        this.model = {
            libros: new Books(),
            modulos: new Module(),
            usuarios: new Usuarios(),
            card: new Card()
        };
        this.view = new View();
    }

    async init() {
        this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
        this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
        this.view.renderSubmitShoppingCart(this.handleSubmitShoppingCart.bind(this));
        this.view.renderEditBook(this.handleEditBook.bind(this));

        try {
            await Promise.all([
                this.model.libros.populate(),
                this.model.modulos.populate(),
                this.model.usuarios.populate(),
                this.model.card.populate()
            ]);
        } catch (error) {
            this.view.renderMessage("error", error);
            return;
        }

        this.view.renderModulesInSelect(this.model.modulos.data);
        this.model.libros.data.forEach(book => this.view.renderNewBook(book));
        console.log("Tamaño carrito " + (this.model.card.data.length));

    }

    async handleSubmitBook(libro) {
        console.log('¿Guardar o Actualizar?:', libro);
        const pages = Number(libro.pages);
        const price = Number(libro.price);

        if (!Number.isInteger(pages) || pages < 0 ||
            !Number.isFinite(price) || price < 0) {
            this.view.renderMessage("error", "Datos inválidos");
            return false;
        }
        try {
            if (this.view.textoForm.textContent === "AÑADIR LIBRO") {
                console.log("Ha entrado ha crear el libro nuevo");
                const nuevoLibro = await this.model.libros.addBook(libro);

                if (!nuevoLibro) {
                    this.view.renderMessage("error", "Error al añadir el libro");
                    return false;
                }

                this.view.renderNewBook(nuevoLibro);
                this.view.renderMessage("info", "Libro añadido correctamente");
                return true;
            } else if (this.view.textoForm.textContent === "ACTUALIZAR LIBRO") {

                libro.id = this.view.idOculta.value;

                const libroActualizado = await this.model.libros.changeBook(libro);
                this.view.renderNewBook(libroActualizado);

                this.view.renderMessage("info", "Libro editado correctamente");
                this.view.resetGuarda();
                return true;
            } else {
                return false;
            }




        } catch (error) {
            this.view.renderMessage("error", error);
            return false;
        }

    }

    async handleRemoveBook(idLibro) {
        try {
            const libroEliminado = await this.model.libros.removeBook(idLibro);

            if (!libroEliminado) {
                this.view.renderMessage("error", "El libro no existe");
                return false;
            }

            const libroCarrito = await this.model.card.getBookById(idLibro);
            if (libroCarrito.id)
                await this.model.card.removeItem(idLibro);


            const lib = this.view.contenedorLibros.querySelector(`[data-id="${String(idLibro)}"]`);
            if (lib) lib.remove();

            console.log("Tamaño del carrito después de eliminar:", this.model.card.data.length);

            this.view.renderMessage("info", "Libro eliminado correctamente");
            return true;
        } catch (error) {
            this.view.renderMessage("error", error);
            return false;
        }
    }

    handleResetForm() {
        this.view.resetForm();
    }

    async handleSubmitShoppingCart(idLibro) {
        try {
            console.log("Ha entrado en el de añadir del controller:", idLibro);
            console.log("Tamaño carrito ANTES:", this.model.card.data.length);

            const libro = await this.model.libros.getBookById(idLibro);
            await this.model.card.addItem(libro);
            console.log("Tamaño carrito DESPUÉS:", this.model.card.data.length);
            this.view.renderMessage("info", "Libro añadido al carrito correctamente");
            alert(`Se ha añadido el libro ${idLibro} al carrito.`);
            return true;

        } catch (error) {
            this.view.renderMessage("error", error);
            return false;
        }

    }
    async handleEditBook(idLibro) {
        try {
            const libro = await this.model.libros.getBookById(idLibro);

            if (!libro) {
                this.view.renderMessage("error", "Libro no encontrado");
                return false;
            }
            console.log("Libro que se va a editar" + libro.id);
            this.view.obtenerDatosFormulario(libro);
            return true;
        } catch (error) {
            this.view.renderMessage("error", error.message || "Error inesperado al editar el libro");
            return false;
        }

    }
}
