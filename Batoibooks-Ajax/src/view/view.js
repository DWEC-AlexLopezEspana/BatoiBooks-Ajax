export class View {
    constructor() {
        this.app = document.querySelector("#app");
        this.contenedorLibros = this.app.querySelector("#list");
        this.form = this.app.querySelector("#form form");
        this.SeleccionModulos = this.app.querySelector("#moduleId");
        this.messageDiv = this.app.querySelector(".messages");

    }

    setBookSubmitHandler(callback) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const idBook = document.getElementById("id").value;
            const userId = document.getElementById("userId").value;
            const moduleCode = document.getElementById("userId").value;
            const publisher = document.getElementById("userId").value;
            const price = document.getElementById("userId").value;
            const pages = document.getElementById("userId").value;
            const status = document.getElementById("userId").value;
            const photo = document.getElementById("userId").value;
            const comments = document.getElementById("userId").value;
            const soldDate = document.getElementById("userId").value;
            callback({ idBook, userId, moduleCode, publisher, price, pages, status, photo, comments, soldDate });

        });

    }

    setBookRemoveHandler(prod) {


    }

    renderModulesInSelect(modulos) {
        this.SeleccionModulos.innerHTML = '<option value="">— Selecciona —</option>';
        modulos.forEach(m => {
            const opt = document.createElement("option");
            opt.value = m.id;
            opt.textContent = m.cliteral;
            this.SeleccionModulos.appendChild(opt);
        });
    }

    renderNewBook(prod) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = prod.id;

        const soldText = prod.soldDate
            ? `Vendido el ${new Date(prod.soldDate).toLocaleDateString()}`
            : "En venta";

        card.innerHTML = `
        <div class="card-img">
            <img src="${prod.photo}" 
            alt="Libro: ${prod.id}">
        </div>
        <div class="card-body">
            <h3>Módulo: ${prod.moduleCode}</h3>
            <h4>${prod.publisher}</h4>
            <p>${prod.pages} páginas</p>
            <p>Estado: ${prod.status}</p>
            <p>${soldText}</p>
            <p>${prod.comments || ""}</p>
            <h4>${Number(prod.price).toFixed(2)} €</h4>
        </div>
    `;
        this.contenedorLibros.appendChild(card);
    }

    renderMessage(type, message) {
        const DOMmessage = document.createElement("div");
        this.messageDiv.appendChild(DOMmessage);
    }


}