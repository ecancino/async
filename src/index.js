
const { fork, runWith, readJSON, writeJSON, getPeople } = require('./helpers')
const { ask } = require('crocks/Reader')
const { of } = require('crocks/Async')

const env = { input: './in/input.json', output: './out/output.json' }

// input : Async e a -> Reader (Async e b)
const input = () =>
  ask(({ input }) => readJSON(input).chain(getPeople))

// output : Async e a -> Reader (Async e a)
const output = a =>
  ask(({ output }) => a.chain(writeJSON(output)))

const reader = ask(of)
  .chain(input)
  .chain(output)

const write = runWith(reader)

fork(
  write(env)
)
