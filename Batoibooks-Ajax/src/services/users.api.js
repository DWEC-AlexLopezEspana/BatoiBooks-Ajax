const SERVER = 'http://localhost:3000';

async function getDBUsers() {
    let response = await fetch(`${SERVER}/users`);
    if (!response.ok) throw new Error("Fallo al obtener todos los usuarios");
    return await response.json();
}

async function getDBUser(idUser) {
    let response = await fetch(`${SERVER}/users/${idUser}`);
    return await response.json();
}

async function getUserById(idUser) {
    let response = await fetch(`${SERVER}/users/${idUser}`);
    if (!response.ok) throw new Error("Usuario no encontrado");
    return await response.json();
}
async function addDBUser(usuario) {
    let response = await fetch(`${SERVER}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) throw new Error("Fallo al añadir el usuario");
    return response.json();

}
async function changeDBUsers(usermodif) {
    let { id } = usermodif;
    let response = await fetch(`${SERVER}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usermodif)
    });
    if (!response.ok) throw new Error("Fallo al modificar el usuario");
    return response.json();
}
async function removeDBUser(idUser) {
    let response = await fetch(`${SERVER}/users/${idUser}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error("Fallo al borrar el usuario");
    return response.json();
}

async function changeDBUserPassword(idUser, newPassword) {
    let response = await fetch(`${SERVER}/users/${idUser}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword })
    })

    if (!response.ok) throw new Error("Fallo al cambiar la contraseña del usuario");

    return response.json();
}


export {
    getDBUsers,
    getUserById,
    getDBUser,
    addDBUser,
    changeDBUsers,
    removeDBUser,
    changeDBUserPassword
};

