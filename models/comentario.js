module.exports = (sql, type) => {
  //crear tabla
 return sql.define('comment', {
//id queda fijo

    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
       type: type.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Debe ingresar nombre"
        },
        len :{
          arg:[2],
          msg:"el nombre debe contener al menos dos letras"

        }
      }
    },
    comment:{
      type: type.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Debe ingresar un comentario"
        },
        len :{
          arg:[1],
          msg:"el nombre debe contener al menos una letra"

        }
      }



   },
  
     },
  {timestamps: true});
    
}