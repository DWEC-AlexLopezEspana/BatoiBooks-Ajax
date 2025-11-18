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
            const dato ={
            id: document.getElementById("id")?.value,
            userId: document.getElementById("userId")?.value,
            moduleCode : document.querySelector("#module-code")?.value,
            publisher : document.getElementById("editorial")?.value,
            price : document.getElementById("price")?.value,
            pages : document.getElementById("pages")?.value,
            status : document.querySelector('input[name="status"]:checked')?.value,
            photo : document.getElementById("photo")?.value,
            comments : document.getElementById("comments")?.value,
            soldDate : document.getElementById("soldDate")?.value,
            };
            callback(dato);

        });

    }

    setBookRemoveHandler(callback) {
        if (!this.contenedorLibros) return;
        const btn = document.getElementById("btnRemove");

        if(!btn) return;
        
        btn.addEventListener("click", () => {
            const idToRemove = document.getElementById("book-id-remove")?.value;
            console.log("Libro que quiero borrar"+idToRemove);
            callback(idToRemove);
        });
    }


    renderModulesInSelect(modulos) {
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
        <h4>${prod.publisher}</h4>
        <p>${prod.pages} páginas</p>
        <p>Estado: ${prod.status}</p>
        <p>${vendidoText}</p>
        <p>${Number(prod.price).toFixed(2)} €</p>
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


        if (type.toLowerCase().trim() === "info") {
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