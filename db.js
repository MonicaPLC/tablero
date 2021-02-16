//para base de datos
const Sequelize = require('sequelize');
const MessageModel = require('./models/mensaje'); //este es ruta de carpetas.
const CommentModel = require('./models/comentario');
// la variable tiene el nombretablaModel y (/nombredemi tabla)


// en los () va nombre base de datos, root, y clave
// crear la base de datos en power shell
const sql = new Sequelize('blogs', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

// acá va variable con nombre de mi tabla
const Message = MessageModel(sql, Sequelize);
const Comment = CommentModel(sql, Sequelize);


// relación uno a muchos
Message.hasMany(Comment);
Comment.belongsTo(Message);

//  después sincronizamos nuestro código con la base de datos
sql.sync()
.then(() => {
  console.log('Tablas creada. Base de datos en uso');
});


// finalmente acá listamos todos los modelos que queremos exportar
module.exports = {
//nombre de la tabla creada

  Message,
 Comment,
};
