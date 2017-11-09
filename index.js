const express = require('express')
const path = require('path');
const app = express()
const bodyParser = require('body-parser');

let users = [
    { name: 'Carlos' }
]

app.use(bodyParser.json()) // for parsing application/json

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/www/index.html'))
})

// Users
app.get('api//users', function (request, response) {
    response.send(users)
})

app.post('api//users', function (req, res) {
    try {
        const newUser = req.body
        console.log(req.body)
        users.push(newUser)
    } catch (error) {
        response.send('Te he fallado :/')
    }

})

app.delete('api//users', function (request, response) {
    // TODO
})

app.listen(12000, () => console.log('Example app listening on http://localhost:12000'))