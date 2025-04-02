const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'db.json');

function addFavorite(newFavorite) {
  // Leer el archivo db.json
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }

    try {
      const db = JSON.parse(data);

      // Añadir el nuevo elemento a favorites
      db.favorites.push(newFavorite);

      // Ordenar el array de favorites por el campo id
      db.favorites.sort((a, b) => parseInt(a.id) - parseInt(b.id));

      // Sobrescribir el archivo db.json con los datos actualizados
      fs.writeFile(filePath, JSON.stringify(db, null, 2), (err) => {
        if (err) {
          console.error('Error al escribir el archivo:', err);
        } else {
          console.log('El archivo db.json ha sido actualizado y ordenado.');
        }
      });
    } catch (parseError) {
      console.error('Error al parsear el archivo JSON:', parseError);
    }
  });
}

module.exports = { addFavorite };
