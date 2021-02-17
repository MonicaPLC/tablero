const{Router} =require('express')
const router=Router();
const {Message, Comment}=require('../db')


router.post('/', async function(req, res){ 
 // al poner create ya se guarda No poner save.
 //await guarda en base de datos

 if(req.body.author==""){
  req.flash("aviso", 'nombre es obligatorio')
  existeError=true;
 }
 if(req.body.message==""){
  req.flash("aviso", 'debes escribir un mensaje')
  existeError=true;
 }
 
  const new_message= await Message.create({
    author: req.body.author,
    message: req.body.message,
  });
  
  res.redirect("/"); 
    
  });

  router.post('/comentarios', async function(req, res){ 
    // al poner create ya se guarda No poner save.
    //await guarda en base de datos
     
     const new_comentario= await Comment.create({
       name: req.body.name,
       comment: req.body.comment,
       messageId:req.body.messageId,
     });
       
     res.redirect("/"); 
       
     });

       
//muestra mensajes capturados en la vista tablero
router.get('/', async (req, res) => { 
  const mensaje = await Message.findAll({
    include:[Comment]
  });
  console.log(mensaje)
  //const comentario = await Comment.findAll()
  
   let aviso=req.flash("aviso");

  //console.log(aviso)
  res.render('tablero', {mensajes:mensaje,aviso});

});

router.get("/delete/:id", async (req, res) => { 

  const borrar= await Message.findByPk(req.params.id);
  const borrar_o= await Comment.findByPk(req.params.id);
  await borrar.destroy();
  await borrar_o.destroy();  
  req.flash("aviso",`El mensaje ${borrar.message} fue eliminado con éxito`)
  req.flash("aviso",`El mensaje ${borrar_o.comment} fue eliminado con éxito`)
  res.redirect("/")
});

router.get("/delete/comment/:id", async (req, res) => { 
  const borrar_o= await Comment.findByPk(req.params.id);
  await borrar_o.destroy();  
 req.flash("aviso",`El mensaje ${borrar_o.comment} fue eliminado con éxito`)
  res.redirect("/")
});



module.exports=router;

