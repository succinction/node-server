const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next)=> {
    var now = new Date().toString()

    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server.log')
    })

    next()
})


app.use((req, res, next)=> {
    // res.render('under.hbs', {
    //     headerMessage: 'Under Maintenance'
    // }) 

    next()
})

app.use(express.static(__dirname + '/public'))


/////////////////////////////////  HELPERS
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

////////////////////////////////// ROUTES
app.get('/', (req, res) => {
    res.render('home.hbs', {
        headerMessage: 'Welcome Home!!' ,
        welcomeMessage: "Hello there and welcome home..."
    })
    
})

// app.get('/about', (req, res) => { res.send('About Page') })
app.get('/about', (req, res) => { 
    res.render('about.hbs', {
        headerMessage: 'About Page!!'
    }) 
})

app.get('/bad', (req, res) => {
    // res.send('Sorry, there was an error.')
    res.send({ errorMessage: 'Sorry, there was an error.' })
})

/////////////////////////////////////// LISTEN
// app.listen(3000)
// app.listen(3000, () => {
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})


//////////////////////////////////////////////////////////////////////////////////////

