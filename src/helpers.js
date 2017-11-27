const log = require('better-log')
const { readFile, writeFile } = require('fs')
const { fromNode } = require('crocks/Async')
const { tryCatch, resultToAsync, curry, constant, map, pick } = require('crocks')

const tryAsync = f => resultToAsync(tryCatch(f))

const showError = e => log('E:', e)
const showValue = v => log('V:', v)
const fork = m => m.fork(showError, showValue)
const runWith = m => e => m.runWith(e)

const parse = tryAsync(JSON.parse)
const stringify = tryAsync(json => JSON.stringify(json, null, 2))

const readAsync = fromNode(readFile)
const writeAsync = fromNode(writeFile)

// readJSON : String -> Async Error Object
const readJSON = file => readAsync(file, 'utf8')
  .chain(parse)

// writeJSON : String -> Object -> Async Error Object
const writeJSON = curry((file, contents) => stringify(contents)
  .chain(json => writeAsync(file, json))
  .map(constant(contents))
)

const getPerson = pick(['name', 'age', 'balance', 'registered', 'tags'])
const getPeople = tryAsync(map(getPerson))

module.exports = { fork, runWith, log, readJSON, writeJSON, getPeople }
