const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// We need to specify the template ejs using the set below. => ejs
// create a views folder
app.set('view engine', 'ejs');

// add a new route handler for "/urls" and use res.render() to pass the URL data to our template.
app.get('/urls', (req, res) =>{
    let templateVars = { urls:urlDatabase };
    res.render("urls_index", templateVars);
});

// Adding a new route

app.get("/urls/:shortURL", (req, res) => {
    let templateVars = { shortURL: req.params.shortURL, longURL:"http://www.lighthouselabs.ca"};
    res.render("urls_show", templateVars);
  });


app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/hello", (req, res) => {
    res.send("<html><body>Hello <b>World</b></body></html>\n");
  });

app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
  });


// ADDED new route for experimental purposes//

app.get("/set", (req, res) => {
    const a = 1;
    res.send(`a = ${a}`);
});
   
app.get("/fetch", (req, res) => {
    res.send(`a = ${a}`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});