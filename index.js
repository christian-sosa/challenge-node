/* eslint-disable array-callback-return */
const express = require('express')
const app = express()
const sequelize = require('./app/db/db')

app.use(require('./app/routes'))

const PORT = 3001
app.listen(PORT, () => {
  console.log(`La app ha arrcanado en http://localhost:${PORT}`)

  sequelize.sync({ force: false }).then(() => {
    console.log('Se ha establecido la conexión')
  }).catch(error => {
    console.log('se ha producido un error', error)
  })
})
