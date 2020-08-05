const express = require("express");
const app = express();
const PORT = 8081; // default port 8080

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//Generate a Random ShortURL using a function 
const addNewShortUrl = (content) => {

  let id = Math.random().toString(30).substring(2, 8);

  const newShort = {
    id: `http://${content}`
  };

  urlDatabase[id] = Object.values(newShort).join(" ");


  //console.log(id)
  return id;

};

// Driver code for addNewShortUrl
// addNewShortUrl("www.facebook.com")
// console.log(urlDatabase)

//Create a function that will update page after edit
const updateUrl = (id, content) => {
  urlDatabase[id] = content;
}


// We need to specify the template ejs using the set below. => ejs
// create a views folder
app.set('view engine', 'ejs');

// Adding body parser parkage "yarn add body-parser"
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Adding cookie parser package
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// add a new route handler for "/urls" and use res.render() to pass the URL data to our template.
app.get('/urls', (req, res) =>{
    let templateVars = { username: req.cookies["username"], urls:urlDatabase };
    res.render("urls_index", templateVars);
});

// Adding a GET Route to Show the Form
app.get("/urls/new", (req, res) => {
    res.render("urls_new");
});

// Adding a GET route for login username
app.get("/login", (req, res) => {
  res.render("_header");
});

// Adding a new route
app.get("/urls/:shortURL", (req, res) => {
    let templateVars = { username: req.cookies["username"], shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
    res.render("urls_show", templateVars);
  });

//Redirect Short URLs

app.get("/u/:shortURL", (req, res) => {
    const longURL = urlDatabase[req.params.shortURL];  
    res.redirect(longURL);
});

app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
  });

//Adding a POST Route to Receive the Form Submission

// app.post("/urls", (req, res) => {
//     console.log(req.body);  // Log the POST request body to the console
//     res.send("Ok");         // Respond with 'Ok' (we will replace this)
// });

// Add a POST route that removes a URL resource, update urls_index.ejs

app.post("/urls/:shortURL/delete", (req, res)=>{

  console.log("DELETE HERE");

  const urlId = req.params.shortURL;

  delete urlDatabase[urlId];

  res.redirect('/urls'); 

})

// Add a POST route that will redirect edit fuction to /urls/:shortURL page 

app.post("/urls/:shortURL/editbut", (req, res)=>{

  console.log("EDITING URL");

  const urlEdit = req.params.shortURL;

  res.redirect(`/urls/${urlEdit}`); 

})

// Add a post to edit form 

app.post("/urls/:shortURL/editform", (req, res)=>{

  console.log("EDITING Form");

  // This code is just for reference and can be delete if you choose////
  //console.log(Object.values(req.body).join(" "));
  //const keys = addNewShortUrl(req.body.fname);
  //let newDbId = urlDatabase[keys];

  let keys = req.params.shortURL;

  updateUrl(keys, `http://${req.body.fname}`);

  res.redirect("/urls"); 

});


// Add post to incorporate a login

app.post("/login", (req, res) => {

  console.log("ADDING USERNAME")
  let user = req.body.username;

  res.cookie(user)

  console.log(user)

  res.redirect("/urls")
})

// Add a post that incorporate Add a new short url to what we have --> to be used later
/* 
app.post("/urls/:shortURL/editform", (req, res)=>{

  console.log("EDITING Form");
  //console.log(Object.values(req.body).join(" "));
  const keys = addNewShortUrl(req.body.fname);

  let newDb = urlDatabase[keys];

  res.redirect(`/urls`); 

}) 

*/

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});




// ADDED new route for experimental purposes// Can be added back above listen to apply
/*
 app.get("/set", (req, res) => {
    const a = 1;
    res.send(`a = ${a}`);
});
   
app.get("/fetch", (req, res) => {
    res.send(`a = ${a}`);
}); 

*/

/* 
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/hello", (req, res) => {
    res.send("<html><body>Hello <b>World</b></body></html>\n");
  }); 
*/