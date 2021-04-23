/* eslint-disable array-callback-return */
const express = require('express')
const app = express()
const sequelize = require('./models/db')
const Post = require('./models/post')
const bp = require('body-parser')

const urlencodedParser = bp.urlencoded({ extended: false })

app.get('/posts', async (req, resp) => {
  const data = await Post.findAll({
    attributes: ['id', 'Titulo', 'Categoria', 'Imagen', 'Fecha_Creacion']
  })
  data.map((dat) => {
    dat.Contenido = undefined
  })
  resp.json(data)
})

app.get('/posts/:id', urlencodedParser, async (req, resp) => {
  const id = req.params.id
  const data = await Post.findByPk(id)
  if (data === null) {
    return resp.status(400).json({
      error: 'no existe ese ID'
    })
  }
  resp.json(data)
})

app.post('/posts', urlencodedParser, async (req, res) => {
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
})

app.patch('/update/:id', urlencodedParser, async (req, res) => {
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
  console.log(data[0])
  if (data[0] === 0) {
    return res.status(400).json({
      error: 'id invalido'
    })
  }
  res.json('Se modifico correctamente el ID: ' + req.params.id)
})

app.delete('/:id', async (req, res) => {
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
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('server up')

  sequelize.sync({ force: false }).then(() => {
    console.log('conectado a db')
  }).catch(error => {
    console.log('se ha producido un error', error)
  })
})
