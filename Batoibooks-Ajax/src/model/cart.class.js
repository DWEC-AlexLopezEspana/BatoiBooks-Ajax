import Book from "./book.class";

export default class Card {
    constructor() {
        this.data = [];
    }

    async populate() {

    }

    async getBookById(idLibro) {
        const libro = this.data.find(lib => lib.id === idLibro)

        return libro?? {};
    }

    async addItem(libro) {
        if (this.getBookById(libro.id).id) {
            throw new Error(`El libro con id ${libro.id} ya está en el carrito`);
        }
        const copiaLibro = { ...libro };
        this.data.push(copiaLibro);
    }

    async removeItem(idLibro) {
        const existe = this.data.findIndex(libro => libro.id === idLibro);

        if (existe == -1) {
            throw new Error(`No se encontró ningún libro con la id ${idLibro} en el carrito`);
        }
        this.data.splice(existe, 1);

    }

    toString() {
        if (this.data.length === 0) {
            return "El carrito está vacío";
        }
        return this.data.map(libro =>
            `- Módulo ${item.moduleCode} (${item.publisher}) — ${item.price} € — ID: ${item.id}`
        ).join('\n');
    }
}