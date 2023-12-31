// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
    let input = req.params.date;
    let now;
    if (input === undefined) {
        now = new Date();
    } else if (/^\d+$/.test(input)) {
        now = new Date(parseInt(input));
    } else {
        now = new Date(input);
    }

    const utc = now.toUTCString();
    if (utc === "Invalid Date") {
        res.json({error: utc});
    } else {
        res.json({unix: now.getTime(), utc: utc});
    }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
