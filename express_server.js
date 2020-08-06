const express = require("express");
const app = express();
const PORT = 8081; // default port 8080

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// create an empty object to store user data pass in by the registration
let users = {}

// Generate a Random user Id to be used for our usersData base 
const genRanId = (content) => {

  let id = Math.random().toString(30).substring(2, 8);

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
app.get('/', (req, res) =>{
    let templateVars = { user: users[req.cookies.user_id], urls:urlDatabase };
    res.render("urls_index", templateVars);
});

// Adding a new route to input registration and password
app.get("/registration", (req, res) =>{
  let templateVars = { user: users[req.cookies.user_id], shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_registration", templateVars);
})

// Adding a GET Route to Show the Form
app.get("/new", (req, res) => {
  let templateVars = { username: req.cookies.username, urls:urlDatabase };

    res.render("urls_new", templateVars);
});

// Adding a new route
app.get("/:shortURL", (req, res) => {
    let templateVars = { username: req.cookies.username, shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
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


// Add a POST route that removes a URL resource, update urls_index.ejs

app.post("/:shortURL/delete", (req, res)=>{

  console.log("DELETE HERE");

  const urlId = req.params.shortURL;

  delete urlDatabase[urlId];

  res.redirect('/'); 

})

// Add a POST route that will redirect edit fuction to /urls/:shortURL page 

app.post("/:shortURL/editbut", (req, res)=>{

  console.log("EDITING URL");

  const urlEdit = req.params.shortURL;

  res.redirect(`/${urlEdit}`); 

})

// Add a post to edit form 

app.post("/:shortURL/editform", (req, res)=>{

  console.log("EDITING Form");

  //This code is just for reference and can be delete if you choose////
  //console.log(Object.values(req.body).join(" "));
  //const keys = addNewShortUrl(req.body.fname);
  //let newDbId = urlDatabase[keys];

  let keys = req.params.shortURL;

  updateUrl(keys, `http://${req.body.fname}`);

  res.redirect("/"); 

});


// Add post to incorporate a login

app.post("/login", (req, res) => {

  console.log("ADDING USERNAME")
  let user = req.body.username;
  res.cookie('username', req.body.username)
  res.redirect("/")
})

// Add a post that removes cookie when logged out button is pressed
app.post("/logout", (req, res) => {

  console.log("LOGGING OUT USER")
  let user = req.body.username;

  res.clearCookie('user_id')

  res.redirect("/")
})


app.post('/registration', (req, res) => {

  console.log("REGISTER NEW USER");

  const username = req.body.username
  const password = req.body.password
  const retype = req.body.retype
  const email = req.body.email

  
  let newId = genRanId(users[username]) 
  
  let newData = {id: newId, password: password, retype: retype, email: email}


  console.log(newData)


 
if(!newData.email || !newData.password){
  console.log("empty email or pass")
  res.send("404 error")
}

for(val in users){
  if(newData.email === users[val].email){
    res.send("user exist")
    console.log("check existance")
  }

}

users[newId] = newData;

res.cookie("user_id", newId)

res.redirect("/")

console.log(users)


// if(newData.email !== users[req.cookies.email]){
//   //success 
//   res.cookie("user_id", newId)
//   res.redirect("/")

//   console.log(users[req.cookies.email])

// } else {
//   //failure your email already exist
//   console.log("already existing email")
//   res.send("Error code 400 - already existing email ")
// }

// } else{
// // ultimate failure 
// // forgot to put email or pass
// console.log("forgot email or pass")
// res.send("Error code 400 - please input email or pass")
// } 


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