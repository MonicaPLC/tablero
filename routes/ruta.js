const { Router } = require("express");
const router = Router();
const { Message, Comment } = require("../db");

router.post("/", async function (req, res) {
  // al poner create ya se guarda No poner save.
  //await guarda en base de datos

  try {
    if (req.body.author == "") {
      throw new Error("nombre es obligatorio");
    }
    if (req.body.message == "") {
      throw new Error("mensaje es obligatorio");
    }
    const new_message = await Message.create({
      author: req.body.author,
      message: req.body.message,
    });
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
  }

  res.redirect("/");
});

router.post("/comentarios", async function (req, res) {
  // al poner create ya se guarda No poner save.
  //await guarda en base de datos

  if (req.body.name == "") {
    req.flash("aviso", "¡Nombre es obligatorio!");
    existeError = true;
  }
  if (req.body.comment == "") {
    req.flash("aviso", "¡Debes escribir un mensaje.!");
    existeError = true;
  }

  const new_comentario = await Comment.create({
    name: req.body.name,
    comment: req.body.comment,
    messageId: req.body.messageId,
  });

  res.redirect("/");
});

//muestra mensajes capturados en la vista tablero
router.get("/", async (req, res) => {
  const mensaje = await Message.findAll({
    include: [Comment],
  });
  console.log(mensaje);
  //const comentario = await Comment.findAll()

  let aviso = req.flash("aviso");
  let error = req.flash("error");

  //console.log(aviso)
  res.render("tablero", { mensajes: mensaje, aviso, error });
});

router.get("/delete/:id", async (req, res) => {
  const borrar = await Message.findByPk(req.params.id);
  await borrar.destroy();
  req.flash("aviso", `El mensaje ${borrar.message} fue eliminado con éxito`);
  res.redirect("/");
});

router.get("/delete/comment/:id", async (req, res) => {
  const borrar_o = await Comment.findByPk(req.params.id);
  await borrar_o.destroy();
  req.flash("aviso", `El mensaje ${borrar_o.comment} fue eliminado con éxito`);
  res.redirect("/");
});

module.exports = router;
