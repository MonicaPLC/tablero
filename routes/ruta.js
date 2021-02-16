const{Router} =require('express')
const router=Router();
const {Message, Comment}=require('../db')


router.post('/', async function(req, res){ 
 // al poner create ya se guarda No poner save.
 //await guarda en base de datos
  const new_message= await Message.create({
    author: req.body.author,
    message: req.body.message,
  });
  /*
  const new_comentario= await Comment.create({
    name: req.body.name,
    comment: req.body.comment,
  });
  */

  res.redirect("/"); 
    
  });

       
//muestra mensajes capturados en la vista tablero
router.get('/', async (req, res) => {  
  const comentario = await Comment.findAll();
  const mensaje = await Message.findAll();
  res.render('tablero', {mensajes:mensaje, comentarios:comentario});

});

router.get("/delete/:id", async (req, res) => { //ruta borrar
  const borrar= await Message.findByPk(req.params.id);
  const borrar_o= await Comment.findByPk(req.params.id);
  await borrar.destroy(); 
  res.redirect("/")
  await borrar_o.destroy();
  res.redirect("/")

});


module.exports=router;

