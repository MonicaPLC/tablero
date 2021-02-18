module.exports = (sql, type) => {
  //crear tabla
  return sql.define(
    "message",
    {
      //id queda fijo

      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      author: {
        type: type.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Debe ingresar nombre",
          },
          len: {
            args: [2],
            msg: "el nombre debe contener al menos dos letras",
          },
        },
      },
      message: {
        type: type.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Debe ingresar nombre",
          },
          len: {
            args: [2],
            msg: "el mensaje debe contener al menos dos letras",
          },
        },
      },
    },
    { timestamps: true }
  );
};
