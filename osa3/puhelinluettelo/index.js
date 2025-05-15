require('dotenv').config()
const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors()) // CORS (Cross-Origin Resource Sharing) on käytössä, jotta eri domainit voivat käyttää resursseja

app.use(express.json())

/*----------------------------------------------------------
const password = process.argv[2]

const url = `mongodb+srv://fullstackkarkki:${password}@cluster0.8trbrmb.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//muokataan vielä kannasta haettavat oliot merkkijonoksi
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//Collection name is people
// const Person = mongoose.model('Person', personSchema)


//----------------------------------------------------------------*//

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms', 
    JSON.stringify(req.body)
  ].join(' ')
}))

let persons = [
    { 
      "name": "Arto Artonen", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    }
]

//vain yksi repsonse.send kutus, sillä se lähettää vastauksen ja sulkee yhteyden
app.get('/', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error)) 
    //console.log(error)
    //response.status(400).send({ error: 'malformatted id' }) //bad request
  })
  /*const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  } */


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
      response.status(204).end()
  })
  .catch(error => next(error))  
//  const id = request.params.id
//  persons = persons.filter(person => person.id !== id)
//  response.status(204).end() // 204 No Content
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Name or number missing' })
  }
 //   return response.status(400).json({ error: 'Name must be unique' }) /
 

  const person = new Person({
    "name": body.name,
    "number": body.number,
    // "id": (Math.round(Math.random() * 100000).toString())
  })

  //persons = persons.concat(person)
  // response.json(person)
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})


//Virheidenkäsittely middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT)
console.log(`Server running on port ${PORT}`)