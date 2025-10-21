const SERVER = import.meta.env.VITE_BASE_URL;

export async function getDBUsers() {
    const response = await fetch(`${SERVER}/users`);
    if (!response.ok) throw new Error("Fallo al obtener todos los usuarios");
    return response.json();
}

function getDBUser() {

}
function changeDBUserPassword() {

}