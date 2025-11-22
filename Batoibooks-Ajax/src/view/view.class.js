export default class View {
    constructor() {
        this.contenedorLibros = document.getElementById("list");
        this.form = document.getElementById("form");
        this.SeleccionModulos = document.getElementById("module-code");
        this.messages = document.getElementById("messages");
        this.idOculta = document.getElementById("idLibroBorrado");
        this.editorial = document.getElementById("editorial");
        this.pages = document.getElementById("pages");
        this.price = document.getElementById("price");
        this.status = document.querySelector('input[name="status"]:checked')?.value;
        this.comments = document.getElementById("comments");
        this.textoForm = document.getElementById("textoForm");
        this.formReset = document.getElementById("btnReset");
        this.formGuarda = document.getElementById("btnGuarda");

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
            const btnEdit = e.target.closest(".edit");

            if (!btnEdit) return;
            const idLibro = btnEdit.dataset.id;
            callback(idLibro);
        })


    }
    obtenerDatosFormulario(libro) {
        console.log("Libro ha entrado a editar y el libro es el siguiente: " + libro);
        this.textoForm.textContent = "ACTUALIZAR LIBRO";
        this.idOculta.value = libro.id;
        this.editorial.value = libro.publisher;
        this.pages.value = libro.pages || 0;
        this.price.value = libro.price || 0;
        this.SeleccionModulos.value = libro.moduleCode;
        this.comments.value = libro.comments;
        const radio = this.form.querySelector(`input[name="status"][value="${libro.status}"]`);
        if (radio) radio.checked = true;
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
        if (!formReset) return;

        formReset.addEventListener("click", () => {
            this.form.reset();
        })
    }

    resetGuarda() {
        formGuarda.addEventListener("click", () =>{
            this.form.reset();
        })
    }

    restablecerVacioForm() {
        console.log("Ha entrado a borrar los datos")
        this.form.reset();

        this.idOculta.value = "";

        this.editorial.value = "";
        this.pages.value = "";
        this.price.value = "";
        this.SeleccionModulos.value = "";

        const statusRadios = document.querySelectorAll('input[name="status"]');
        statusRadios.forEach(radio => radio.checked = false);

        this.comments.value = "";

        this.textoForm.textContent = "AÑADIR LIBRO";

        console.log("Se ha vaciado todo");

    }


    renderNewBook(prod) {
        if (!this.contenedorLibros || !prod.id) return;

        const existe = this.contenedorLibros.querySelector(`[data-id="${prod.id}"]`);

        const vendidoText = prod.soldDate
            ? `Vendido el ${new Date(prod.soldDate).toLocaleDateString()}`
            : "En venta";

        const html = `
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

        if (existe) {
            console.log("Entra para actualizar datos del libro y haber si borra");
            existe.innerHTML = html;
        } else {
            const div = document.createElement("div");
            div.className = "card";
            div.dataset.id = prod.id;
            div.innerHTML = html;
            this.contenedorLibros.appendChild(div);

        }

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