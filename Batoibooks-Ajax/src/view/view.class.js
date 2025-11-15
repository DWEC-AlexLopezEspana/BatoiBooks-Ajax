export default class View {
    constructor() {
        this.contenedorLibros = document.getElementById("list");
        this.form = document.getElementById("form");
        this.SeleccionModulos = document.getElementById("module-code");
        this.messages = document.getElementById("messages");

    }

    setBookSubmitHandler(callback) {//
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const idBook = document.getElementById("id").value;
            const userId = document.getElementById("userId").value;
            const moduleCode = document.getElementById("moduleCode").value;
            const title = document.getElementById("title").value;
            const publisher = document.getElementById("publisher").value;
            const price = document.getElementById("price").value;
            const pages = document.getElementById("pages").value;
            const state = document.getElementById("state").value;
            const photo = document.getElementById("photo").value;
            const comments = document.getElementById("comments").value;
            const sell = document.getElementById("sell").checked;
            const soldDate = document.getElementById("soldDate").value;
            callback({ idBook, userId, moduleCode, title, publisher, price, pages, state, sell, photo, comments, soldDate });

        });

    }

    setBookRemoveHandler(callback) {
        if (!this.contenedorLibros) return;

        this.contenedorLibros.addEventListener("click", (e) => {
            const btn = e.target;
            if (btn.tagName === "BUTTON" && btn.dataset.action === "remove") {
                const idBook = Number(btn.dataset.id);
                callback(idBook);
            }
        });
    }


    renderModulesInSelect(modulos) {//
        if (!this.SeleccionModulos) return;
        this.SeleccionModulos.innerHTML = '<option value="">— Selecciona —</option>';
        modulos.forEach(m => {
            const opt = document.createElement("option");
            opt.value = m.code;
            opt.textContent = m.cliteral;
            this.SeleccionModulos.appendChild(opt);
        });
    }

    renderNewBook(prod) {
        if (!this.contenedorLibros) return;
        const div = document.createElement("div");
        div.className = "card";
        div.dataset.id = prod.id;

        const vendidoText = prod.soldDate
            ? `Vendido el ${new Date(prod.soldDate).toLocaleDateString()}`
            : "En venta";

        div.innerHTML = `
        <h3>Módulo: ${prod.moduleCode} </h3>
        <p class="book-id"> ID: ${prod.id}</p>
        <h4>${prod.title || prod.publisher}</h4>
        <p>${prod.pages} páginas</p>
        <p>Estado: ${prod.state}</p>
        <p>${vendidoText}</p>
        <p>${Number(prod.price).toFixed(2)} €</p>
        <button data-action="remove" data-id="${prod.id}">Eliminar</button>
        `;
        this.contenedorLibros.appendChild(div);
    }

    renderMessage(type, message) {
    if (!this.messages) {
        this.messages = document.getElementById("messages");
        if (!this.messages) {
            this.messages = document.createElement("div");
            this.messages.id = "messages";
            document.body.appendChild(this.messages);
        }
    }

    const alertDiv = document.createElement("div");


    alertDiv.classList.add(type.toLowerCase().trim());
    alertDiv.classList.add("alert");
    alertDiv.classList.add(`alert-${type.toLowerCase().trim()}`);
    alertDiv.classList.add("alert-dismissible");


    if(type.toLowerCase().trim() === "info"){
        alertDiv.classList.add("error");
    }

    alertDiv.setAttribute("role", "alert");

    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">x</button>
    `;

    alertDiv.querySelector("button").onclick = () => alertDiv.remove();

    this.messages.appendChild(alertDiv);


    if (type.toLowerCase().trim() !== "error") {
        setTimeout(() => alertDiv.remove(), 3000);
    }
}





}