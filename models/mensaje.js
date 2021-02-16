module.exports = (sql, type) => {
  //crear tabla
 return sql.define('message', {
//id queda fijo

    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author:{
       type: type.STRING,
      allowNull:false,
    },
    message:{
      type: type.STRING,
      allowNull:false,
   },
  
     },
  {timestamps: true});
    
}