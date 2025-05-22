const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10 // kuinka monta kierrosta bcrypt tekee hashin luomiseksi, 10 eli 2^10 = 1024 on hyvä
  const passwordHash = await bcrypt.hash(password, saltRounds) //tallennetaan ainutlaatuinen hash 

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter