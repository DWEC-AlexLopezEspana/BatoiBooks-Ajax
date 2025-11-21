export default class View {
    constructor() {
        this.contenedorLibros = document.getElementById("list");
        this.form = document.getElementById("form");
        this.SeleccionModulos = document.getElementById("module-code");
        this.messages = document.getElementById("messages");
        const btnEdit = document.getElementById("edit");

    }

    setBookSubmitHandler(callback) {//
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const dato = {
                id: document.getElementById("id")?.value,
                userId: document.getElementById("userId")?.value,
                moduleCode: document.querySelector("#module-code")?.value,
                publisher: document.getElementById("editorial")?.value,
                price: document.getElementById("price")?.value,
                pages: document.getElementById("pages")?.value,
                status: document.querySelector('input[name="status"]:checked')?.value,
                photo: document.getElementById("photo")?.value,
                comments: document.getElementById("comments")?.value,
                soldDate: document.getElementById("soldDate")?.value,
            };
            callback(dato);

        });

    }


    setBookRemoveHandler(callback) {
        this.contenedorLibros?.addEventListener("click", (e) => {
            const btnRemove = e.target.closest(".delete");
            if (!btnRemove) return;
            const idLibro = btnRemove.dataset.id
            callback(idLibro);
        })


    }

    renderSubmitShoppingCart(callback) {
        this.contenedorLibros?.addEventListener("click", (e) => {
            const btnAddCart = e.target.closest(".shopping");
            if (!btnAddCart) return;
            const idLibro = btnAddCart.dataset.id;
            callback(idLibro);
        })


    }

    renderEditBook(callback) {
        this.contenedorLibros?.addEventListener("click", (e) => {
            const btnAddCart = e.target.closest(".edit");
            console.log("Editando Libro");
            if (!btnAddCart) return;
            const idLibro = btnAddCart.dataset.id;
            callback(idLibro);
        })


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



    resetForm() {
        const formReset = document.getElementById("btnReset");

        if (!formReset) return;

        formReset.addEventListener("click", () => {
            this.form.reset();
        })
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
        <p class="precio">${Number(prod.price).toFixed(2)} €</p>
        <button class="shopping" data-id="${prod.id}">
            <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="edit" data-id="${prod.id}">
            <span class="material-icons">edit</span>
        </button>
        <button class="delete" data-id="${prod.id}">
            <span class="material-icons">delete</span>
        </button>
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