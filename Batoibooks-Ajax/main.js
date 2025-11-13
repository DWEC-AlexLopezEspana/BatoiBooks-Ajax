import Controller from './src/controller/controller.class';
import logoBatoi from './public/logoBatoi.png';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${logoBatoi}" class="logo" alt="Batoi Logo"/>
    </a>
    <h1>BatoiBooks</h1>
   <nav>
      <ul>
        <li><a href="#list">Ver Libros</a></li>
        <li><a href="#form">Añadir Libro</a></li>
        <li><a href="#about">Acerca de...</a></li>
      </ul>
    </nav>

    <div id="messages" class="messages">
      <p>Abre la consola para ver el funcionamiento de la aplicación.</p>
    </div>

    <main>
      <div id="remove">
        <label for="book-id-remove">ID del libro a eliminar:</label>
        <input
          type="number"
          id="book-id-remove"
          name="bookId"
          required
          min="1"
        />
        <button type="button">Eliminar libro</button>
      </div>
      <div id="form">
        <form>
          <div>
            <label for="title">Título:</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div>
            <label for="editorial">Editorial:</label>
            <input type="text" id="editorial" name="editorial" required />
          </div>
          <div>
            <label for="pages">Páginas:</label>
            <input type="number" id="pages" name="pages" required min="1" />
          </div>
          <div>
            <label for="price">Precio (€):</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              required
              min="0"
            />
          </div>
          <div>
            <label for="moduleId">Módulo:</label>
            <select id="moduleId" name="moduleId" required></select>
          </div>
          <div>
            <label>Estado:</label>
            <label
              ><input type="radio" name="status" value="good" required />
              Bueno</label
            >
            <label><input type="radio" name="status" value="bad" /> Malo</label>
          </div>
          <div>
            <label for="comments">Comentarios:</label>
            <textarea id="comments" name="comments"></textarea>
          </div>
          <button type="submit">Guardar</button>
          <button type="reset">Reset</button>
        </form>
      </div>
      <div id="about">
      </div>
      <div id="list"></div>
    </main>

    <footer>
      <p>Alex Lopez España</p>
    </footer>
  <div>
`

document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
})