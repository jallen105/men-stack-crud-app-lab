const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")
const path = require("path")

const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

const Cat = require('./models/cat.js')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")))

app.get('/cats', async (req, res) => {
    const allCats = await Cat.find()
    res.render('index.ejs', { cats: allCats })
})

app.get('/cats/new', (req, res) => {
    res.render('new.ejs')
})

app.get('/cats/:catId', async (req, res) => {
    const foundCat = await Cat.findById(req.params.catId)
    res.render('show.ejs', { cat: foundCat })
})

app.get('/cats/:catId/edit', async (req, res) => {
    const foundCat = await Cat.findById(req.params.catId)
    res.render('edit.ejs', { cat: foundCat })
})

app.put('/cats/:catId', async (req, res) => {
    await Cat.findByIdAndUpdate(req.params.catId, req.body)
    res.redirect(`/cats/${req.params.catId}`)
})

app.post('/cats', async (req, res) => {
    const newCat = await Cat.create(req.body)
    console.log(newCat)
    res.redirect('/cats')
})

app.delete('/cats/:catId', async (req, res) => {
    await Cat.findByIdAndDelete(req.params.catId)
    res.redirect('/cats')
})

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})
