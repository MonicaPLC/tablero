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
    },
    comment:{
      type: type.STRING,
      allowNull:false,
   },
  
     },
  {timestamps: true});
    
}