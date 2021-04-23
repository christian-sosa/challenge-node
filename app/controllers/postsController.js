const Controller = {}
const Post = require('../models/post')

Controller.getPosts = async (req, resp) => {
  const data = await Post.findAll({
    attributes: ['id', 'Titulo', 'Categoria', 'Imagen', 'Fecha_Creacion']
  })
  // eslint-disable-next-line array-callback-return
  data.map((dat) => {
    dat.Contenido = undefined
  })
  resp.json(data)
}

Controller.getPostsOne = async (req, resp) => {
  const id = req.params.id
  const data = await Post.findByPk(id)
  if (data === null) {
    return resp.status(400).json({
      error: 'no existe ese ID'
    })
  }
  resp.json(data)
}

Controller.postPost = async (req, res) => {
  const post = req.body
  if (!post.titulo || !post.contenido || !post.categoria || !post.imagen) {
    return res.status(400).json({
      error: 'Falta un campo obligatorio'
    })
  }
  const validacion = post.imagen.slice(-3)
  console.log(validacion)
  if (validacion !== 'jpg' && validacion !== 'png') {
    return res.status(400).json({
      error: 'formato invalido'
    })
  }
  const data = await Post.create({
    Titulo: post.titulo,
    Categoria: post.categoria,
    Contenido: post.contenido,
    Imagen: post.imagen,
    Fecha_Creacion: new Date()
  })
  res.json(data)
}

Controller.patchPost = async (req, res) => {
  const post = req.body
  if (!post.titulo || !post.contenido || !post.categoria || !post.imagen) {
    return res.status(400).json({
      error: 'Falta un campo obligatorio'
    })
  }
  const validacion = post.imagen.slice(-3)
  if (validacion !== 'jpg' && validacion !== 'png') {
    return res.status(400).json({
      error: 'formato invalido'
    })
  }
  const data = await Post.update({
    Titulo: post.titulo,
    Categoria: post.categoria,
    Contenido: post.contenido,
    Imagen: post.imagen,
    Fecha_Creacion: new Date()
  }, {
    where: {
      id: req.params.id
    }
  })
  if (data[0] === 0) {
    return res.status(400).json({
      error: 'id invalido'
    })
  }
  res.json('Se modifico correctamente el ID: ' + req.params.id)
}

Controller.deletePost = async (req, res) => {
  const data = await Post.destroy({
    where: {
      id: req.params.id
    }
  })
  if (data === 0) {
    return res.status(400).json({
      error: 'id invalido'
    })
  }
  res.json('Se elimino correctamente el ID: ' + req.params.id)
}

module.exports = Controller
