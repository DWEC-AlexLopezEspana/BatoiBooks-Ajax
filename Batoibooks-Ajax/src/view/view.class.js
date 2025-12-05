export default class View {
    constructor() {
        //FORMULARIO
        this.contenedorLibros = document.getElementById("list");
        this.form = document.querySelector("#form form");
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
        this.formGuarda = document.getElementById("btnGuardar");

        //CARRITO
        this.shopRealizarPedido =document.getElementById("btnRealizarPedido");
        this.shopVaciarPedido = document.getElementById("btnResetCarrito");
        this.contenedorShopLibros = document.getElementById("cart");

        //Errores
        this.errorEditorial = document.getElementById("errorEditorial");
        this.errorPaginas = document.getElementById("errorPaginas");
        this.errorPrecio = document.getElementById("errorPrecio");
        this.errorModule = document.getElementById("errorModule");
        this.errorEstado = document.getElementById("errorEstado");

    }

    //#region ---------------- METODOS LIBRO ----------------

    setBookSubmitHandler(callback) {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.mostrarErrores();
            if (!this.form.checkValidity()) {
                this.renderMessage("error", "Corrige los errores en el formulario.");
                return;
            }
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
            if (!dato.moduleCode || !dato.publisher || !dato.status) {
                this.renderMessage("error", "Faltan campos obligatorios.");
                return;
            }
            callback(dato);
        });

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

    renderSubmitShoppingCart(callback) {

        this.contenedorLibros?.addEventListener("click", (e) => {
            const btnAddCart = e.target.closest(".shopping");
            if (!btnAddCart) return;
            const idLibro = btnAddCart.dataset.id;
            console.log("Producto recibido" + idLibro);
            callback(idLibro);
        })


    }
    renderEditBook(callback) {
        this.contenedorLibros?.addEventListener("click", (e) => {
            const btnEdit = e.target.closest(".edit");
            if (!btnEdit) return;
            e.preventDefault();
            const idLibro = btnEdit.dataset.id;
            callback(idLibro);
        })
    }

    setBookRemoveHandler(callback) {
        this.contenedorLibros?.addEventListener("click", (e) => {
            const btnRemove = e.target.closest(".delete");
            if (!btnRemove) return;
            const idLibro = btnRemove.dataset.id
            callback(idLibro);
        })


    }
    //#endregion ---------------- METODOS LIBRO ----------------

    //#region ---------------- METODOS CARRITO ----------------

    renderNewShopBook(prod) {
        if (!this.contenedorShopLibros || !prod.id) return;

        const existe = this.contenedorShopLibros.querySelector(`[data-id="${prod.id}"]`);

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
        <button class="deleteShop" data-id="${prod.id}">
            <span class="material-icons">delete</span>
        </button>
        `;

        if (!existe) {
            const div = document.createElement("div");
            div.className = "card";
            div.dataset.id = prod.id;
            div.innerHTML = html;
            this.contenedorShopLibros.appendChild(div);
        }
    }


    renderRemoveShopBook(callback) {
        this.contenedorShopLibros?.addEventListener("click", async (e) => {
            const btnRemoveCart = e.target.closest(".deleteShop");
            if (!btnRemoveCart) return;

            const idLibro = btnRemoveCart.dataset.id;
            console.log("Producto recibido:" + idLibro);
            await callback(idLibro);
        })

    }
    realizarPedidoShop(callback) {
        if (!this.shopRealizarPedido) return;

        this.shopRealizarPedido.addEventListener("click", () =>{
            const librosEnCarrito = Array.from(this.contenedorShopLibros?.querySelectorAll(".card") || []);
            console.log("Libros en Carrito:" +librosEnCarrito);
            callback(librosEnCarrito);
        });
    }

    vaciadoPedidoShop(callback) {
        if (!this.shopVaciarPedido) return;

         this.shopVaciarPedido.addEventListener("click", () =>{
            const librosEnCarrito = Array.from(this.contenedorShopLibros?.querySelectorAll(".card") || []);
            console.log("Libros en Carrito:" +librosEnCarrito);
            callback(librosEnCarrito);
        });
    }




    //#endregion ---------------- METODOS CARRITO ----------------

    //#region ---------------- METODOS MODULOS ----------------

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
    //#endregion ---------------- METODO MODULOS ----------------

    //#region ---------------- METODO MENSAJES ----------------


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

    //#endregion ---------------- METODO MENSAJES ----------------

    //#region ---------------- METODOS RESETEAR ----------------

    resetForm() {
        if (!formReset) return;

        formReset.addEventListener("click", () => {
            this.form.reset();
        })
    }
    //#endregion ---------------- METODOS RESETEAR ----------------

    //#region ---------------- METODOS COMPLEMENTARIOS ----------------


    obtenerDatosFormulario(libro) {
        console.log("Libro ha entrado a editar y el libro es el siguiente: " + libro);
        this.idOculta.value = libro.id;
        this.editorial.value = libro.publisher;
        this.pages.value = libro.pages || 0;
        this.price.value = libro.price || 0;
        this.SeleccionModulos.value = libro.moduleCode;
        this.comments.value = libro.comments;
        const radio = this.form.querySelector(`input[name="status"][value="${libro.status}"]`);
        if (radio) radio.checked = true;
    }

    restablecerVacioForm() {
        this.idOculta.value = "";

        this.editorial.value = "";
        this.pages.value = "";
        this.price.value = "";
        this.SeleccionModulos.value = "";

        const statusRadios = document.querySelectorAll('input[name="status"]');
        statusRadios.forEach(radio => radio.checked = false);

        this.comments.value = "";
    }

    mostrarErrores() {
        const campos = [
            { input: this.SeleccionModulos, error: this.errorModule },
            { input: this.editorial, error: this.errorEditorial },
            { input: this.price, error: this.errorPrecio },
            { input: this.pages, error: this.errorPaginas }
        ];
        campos.forEach(c => {
            c.error.textContent = c.input.validationMessage;
        });

        const status = this.form.querySelector('input[name="status"]:checked');
        this.errorEstado.textContent = status ? "" : "Debes Seleccionar un estado";
    }

    //#endregion ---------------- METODOS COMPLEMENTARIOS ----------------










}