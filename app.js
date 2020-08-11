const express = require('express')
const app = express()
const bodyParser = require('body-parser')




// Example protected and unprotected routes
app.get('/', function(req, res){
  res.send(`Example Home page!`)
})

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${3000}!`))

