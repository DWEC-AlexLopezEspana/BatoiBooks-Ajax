export default class Book {
    constructor(dato = {}) {
        this.id = dato.id;
        this.userId = dato.userId;
        this.moduleCode = dato.moduleCode;
        this.publisher = dato.publisher;
        this.price = dato.price;
        this.pages = dato.pages;
        this.status = dato.status;
        this.soldDate = dato.soldDate ?? "";
        this.photo = dato.photo ?? "";
        this.comments = dato.comments ?? "";
    }

    toString() {
        return (
            "Id Libro: " + this.id + "\n" +
            "Usuario ID: " + this.userId + "\n" +
            "Código Módulo: " + this.moduleCode + "\n" +
            "Editorial: " + this.publisher + "\n" +
            "Precio: " + this.price + "\n" +
            "Páginas: " + this.pages + "\n" +
            "Estado: " + this.status + "\n" +
            "Fecha Venta: " + this.soldDate + "\n" +
            "Foto: " + this.photo + "\n" +
            "Comentarios: " + this.comments
        );
    }
}