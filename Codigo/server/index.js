const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios')
const app = express()
const port = 3001
const path = require('path')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
  let config = {
    method:"GET",
    url:"https://api.jsonbin.io/v3/b/6654d651e41b4d34e4fa5b0e",
    headers:{'Content-Type':'application/json',"X-Master-Key":"$2a$10$ENtdfET3W.pgjb8au3iKVeLRWG8xskdsrbpGpg2cSlfySgpCc.ZIO"}
  }
  axios(config)
  .then(result =>{
    res.send(result.data.record)
  })
})

const book = require("./controller/ApiRest")

app.post("/registro-libro",book.create)
app.delete('/eliminar-libro/:id', book.delete)
app.put('/actualizar-libro/:id',book.update)

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
