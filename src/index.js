const { pipeK } = require('crocks')
const { fork, readJSON, writeJSON, getPeople } = require('./helpers')

const flow = pipeK(
  readJSON,
  getPeople,
  writeJSON('./out/output.json')
)

const m = flow('./in/input.json')

fork(m)
