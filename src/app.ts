import express from 'express'
import bodyParser from 'body-parser'
import { Task } from './task-types.js'

const app = express()
const tasks: Array<Task> = []

app.use(bodyParser.json())

app.get('/healthcheck', function(req, res) {
  res.status(200).json({ success: true })
})

app.get('/api/tasks', (req, res) => {
  res.json(tasks).send()
})

app.post('/api/tasks', (req, res) => {
  const { task } = req.body
  console.log(task)
  tasks.push(task)
  res.status(201).send()
})

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params
  console.log(tasks.length)
  console.log(tasks[Number(id)])
  if (Number(id) > tasks.length - 1) {
    res.status(404).send()
    return
  }
  tasks.splice(Number(id))
  res.status(204).send()
})

app.listen(5200, () => console.log('Listening on port 5200'))
