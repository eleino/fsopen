const express= require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))
const tiny = ':method :url :status :res[content-length] - :response-time ms'
app.use(morgan(`${tiny} :body`))

let persons = [{
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
    },
    {
        "id": "8375",
        "name": "Best Friend",
        "number": "987654321"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    person ? response.json(person) : response.status(404).end()
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 100000).toString();
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) return response.status(400).json({error: 'missing name'})
    if (!body.number) return response.status(400).json({error: "missing number"})
    if (persons.find(person => person.name === body.name))
        return response.status(400).json({error: "That name already exists"})
    
    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})