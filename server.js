const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")

const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

const Cat = require('./models/cat.js')

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use(morgan('dev'));

app.get('/cat', (req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})
