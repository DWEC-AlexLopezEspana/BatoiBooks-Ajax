const SERVER = 'http://localhost:3000';

async function getDBBooks() {
    const resp = await fetch(`${SERVER}/books`);
    if (!resp.ok) throw new Error("Fallo al obtener todos los Libros");
    return await resp.json();
}

async function getDBBook(idLibro) {
    const res = await fetch(`${SERVER}/books/${idLibro}`);
    return await res.json();
}

async function addDBBook(libro) {
    let response = await fetch(`${SERVER}/books/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libro)
    });
    if (!response.ok) throw new Error("Error al guardar añadir un Libro");
    return await response.json();
}

async function removeDBBook(idLibro) {
    let response = await fetch(`${SERVER}/books/${idLibro}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error("Ha habido un error al borrar el Libro");
    return await response.json();
}

async function changeDBBook(libMod) {
    let { id } = libMod;
    let response = await fetch(`${SERVER}/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libMod)
    })
    if (!response.ok) throw new Error("Ha habido un error al actualizar los datosde del libro");
    return await response.json();
}

export {
    getDBBooks,
    getDBBook,
    addDBBook,
    removeDBBook,
    changeDBBook
};