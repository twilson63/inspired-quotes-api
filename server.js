const http = require('http')
const request = require('request')
const qs = require('querystring')
const HttpCors = require('http-cors')
const cors = new HttpCors();
const { split, nth } = require('ramda')

const server = http.createServer((req, res) => {
  if (cors.apply(req, res)) return
  const query = qs.parse(nth(-1, split('?', req.url)))
  if (query.key !== process.env.KEY) { return res.end('KEY is Required!')}

  request(`http://api.forismatic.com/api/1.0/?method=getQuote&format=json&key=1&lang=en`).pipe(res)
})

server.listen(8000)

console.log('api server listening on 8000')
