import { View } from '../view/view.js'
import { Books } from '../model/books.class.js';
import { Module } from '../model/modules.class.js';

export class Controller {
    constructor() {
        this.view = new View();
        this.libros = new Books();
        this.modulos = new Module();

    }

    async init() {
        let div = document.getElementById("h1");
        div.textContent = "Buenos dias";
    }
}

function handleSubmitBook(){
    console.log("handleSubmitBook");

}

function handleRemoveBook(){
    console.log("handleRemoveBook");

}

