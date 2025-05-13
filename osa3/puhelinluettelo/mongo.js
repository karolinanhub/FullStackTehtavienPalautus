const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackkarkki:${password}@cluster0.8trbrmb.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Define the schema for the phonebook entries
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//Collection name is people, koska se on person monikossa in lowercase
const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
  // Jos argumentteja on vähemmän kuin 5, tulostetaan kaikki henkilöt
  // find.hakuehto. koska {} on tyhjä, saadaan kaikki
  Person
  .find({})
  .then(result => {
    console.log('puhelinluettelo:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close() // suljetaan yhteys kohdassa .then
  })
  return
}

// modelin avulla person-olio
const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

// tuloson on takaisinkutsun parametrissa result
person.save().then(result => {
  console.log('added', result.name, 'number', result.number, 'to phonebook')
  mongoose.connection.close()
})