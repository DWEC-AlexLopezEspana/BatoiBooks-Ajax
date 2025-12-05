import Book from "./book.class";

export default class Card {
    constructor() {
        this.data = [];
        this.loadFromLocalStorage();
    }

    async populate() {

    }

    async getBookById(idLibro) {
        const libro = this.data.find(lib => lib.id === idLibro)
        return libro?? {};
    }

    async addItem(libro) {

        const libroExiste = await this.getBookById(libro.id);
        if (libroExiste.id) {
            throw new Error(`El libro con id ${libro.id} ya está en el carrito`);
        }
        this.data.push({ ...libro });
        this.saveToLocalStorage();
    }

    async removeItem(idLibro) {
        const existe = this.data.findIndex(libro => libro.id === idLibro);

        if (existe == -1) {
            throw new Error(`No se encontró ningún libro con la id ${idLibro} en el carrito`);
        }
        this.data.splice(existe, 1);
        this.saveToLocalStorage();

    }

    saveToLocalStorage(){
        localStorage.setItem("carritoLibros", JSON.stringify(this.data));
    }

    loadFromLocalStorage(){
        const storage = localStorage.getItem("carritoLibros");
        if(storage){
            try {
                this.data = JSON.parse(storage);
            } catch (error) {
                this.data = [];
                return "Error al cargar el carrito desde localStorage";
            }
        }
    }

    toString() {
        if (this.data.length === 0) {
            return "El carrito está vacío";
        }
        return this.data.map(libro =>
            `- Módulo ${libro.moduleCode} (${libro.publisher}) — ${libro.price} € — ID: ${libro.id}`
        ).join('\n');
    }
}