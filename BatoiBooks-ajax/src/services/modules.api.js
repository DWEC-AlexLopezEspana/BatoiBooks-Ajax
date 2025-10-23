const SERVER = 'http://localhost:3000';

async function getDBModules() {
    let response = await fetch(`${SERVER}/modules`);
    if (!response.ok) throw new Error("Fallo al obtener todos los usuarios");
    return await response.json();
}

/*async function addDBModule(usuario) {
    let response = await fetch(`${SERVER}/modules/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) throw new Error("Fallo al añadir el usuario");
    return response.json();

}*/
/*async function changeDBModules(Modulemodif) {
    let { id } = Modulemodif;
    let response = await fetch(`${SERVER}/modules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Modulemodif)
    });
    if (!response.ok) throw new Error("Fallo al modificar el usuario");
    return response.json();
}
async function removeDBModule(idModule) {
    let response = await fetch(`${SERVER}/modules/${idModule}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error("Fallo al borrar el usuario");
    return response.json();
}*/


export {
    getDBModules
};

