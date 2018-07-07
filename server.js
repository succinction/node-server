const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var coinAlgorithm = require('./coinAlgorithm')

const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    var now = new Date().toString()

    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    // console.log(res.headersSent)
    // console.log(res.headers)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server.log')
    })

    next()
})


// app.use((req, res, next) => {
//     // res.render('under.hbs', {
//     //     headerMessage: 'Under Maintenance'
//     // }) 

//     next()
// })

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
        headerMessage: 'Welcome Home!!',
        welcomeMessage: "Hello there and welcome home..."
    })

})

app.get('/coin_guru', (req, res) => {
    res.render('coin_solution.hbs', {
        headerMessage: 'Coin Puzzle Solver Robot!'
    })
})

app.get('/coin_measure/:number/:balance', (req, res) => {
    // console.log("######coin measure yes")
    // console.log("###1 req:", req.method)
    console.log("###2 req:", req.params)
    console.log("###3 req:", req.url)
    // console.log("res", res.coins)

    var scale_results = req.params.balance.split(',')  // [Number(req.params.number)-1]

    let response_message = "prep..."
    // if (Number(req.params.number === 1)) {
    if (Number(req.params.number) === 1) {
        if (scale_results[0] === "left_1") {
            response_message = `A)Rearrange the coins exactly as I describe next: 1) Move coin 3 and 4 from the left side to the right side. 2) Move
        coins 6, 7, 8 to the table. 3) move coin 9 to the left side of the scale. What is the result?`
        } else if (scale_results[0] === "right_1") {
            response_message = `B)Rearrange the coins exactly as I describe next: 1) Move coin 3 and 4 from the left side to the right side. 2) Move
        coins 6, 7, 8 to the table. 3) move coin 9 to the left side of the scale. What is the result?`
        } else if (scale_results[0] === "balanced_1") {
            response_message = `C)Rearrange the coins exactly as I describe next: 1) remove all the coins from the scale. 2) put coins 6, 7, 8 on the
            left side fo the scale. 3) put coins 9, 10, 11 on the right side fo the scale. What is the result?`
        } else {

        }
    } else if (Number(req.params.number) === 2) {
        if (scale_results[1] === "left_2") {
            response_message = `A)Rearrange the coins exactly`
        } else if (scale_results[1] === "right_2") {
            response_message = `B)Rearrange the coins exactly`
        } else if (scale_results[1] === "balanced_2") {
            response_message = `C)Rearrange the coins exactly`
        } else {

        }
    } else if (Number(req.params.number) === 3) {
        if (scale_results[2] === "left_3") {
            response_message = `A) Here is where I return you an answer`
        } else if (scale_results[2] === "right_3") {
            response_message = `B) The ANSWER IS`
        } else if (scale_results[2] === "balanced_3") {
            response_message = `C) Here is the answer`
        } else {

        }

        //////////////////////////////////////////////////////

        var truth_table = coinAlgorithm.create_truth_table(scale_results)
        var final_answer = coinAlgorithm.find_false_coin(truth_table)
        response_message = final_answer


    } else {
        console.log("Invalid number param")
    }

    // use coin algorithm to send response
    res.send({
        coins: scale_results.toString(),
        instructions: response_message
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

