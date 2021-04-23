const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Post extends Model {}
Post.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Titulo: DataTypes.STRING,
  Contenido: DataTypes.STRING,
  Imagen: DataTypes.STRING,
  Categoria: DataTypes.STRING,
  Fecha_Creacion: DataTypes.DATE
}, {
  timestamps: false,
  sequelize,
  modelName: 'posts'
})

module.exports = Post
