const express = require("express");
//const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express();
const PORT = 8081; //// note that i changed this to 8081 not 8080 

<<<<<<< HEAD
//Old database 
/* const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
}; */

//New Data base
const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
=======

//New Data base
const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48lW"
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "aJ48lW"
  }
>>>>>>> modifying
};

// We need to specify the template ejs using the set below. => ejs
// create a views folder
app.set('view engine', 'ejs');

//app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ["I am not doing so well"],
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

// create an empty object to store user data pass in by the registration
let users = {}

// Generate a Random user Id to be used for our usersData base 
//similar to Generate a Random ShortURL using a function 
const genRanId = () => {

  let id = Math.random().toString(30).substring(2, 8);

  return id;
};


//Create a function that will update page after edit
const updateUrl = (shortURL, longURL) => {
  urlDatabase[shortURL].longURL = longURL;
};

//Create a function that will tell if its users link or not 
const usersLink = function (object, id) {
  let usersObject = {};
  for (let key in object) {
    if (object[key].userID === id) {
      usersObject[key] = object[key];
    }
  }
  return usersObject;
}
//Create a function that will tell if its users link or not 
const usersLink = function (object, id) {
  let usersObject = {};
  for (let key in object) {
    if (object[key].userID === id) {
      usersObject[key] = object[key];
    }
  }
  return usersObject;
}

// add a new route handler for "/urls" and use res.render() to pass the URL data to our template.
app.get('/urls', (req, res) => {

  const id = req.session.user_id;
  const user = id ? users[id] : null;

  if (user) {
    let templateVars = {
      urls: usersLink(urlDatabase, id),
      user,
      error:"Please login or register as new user...."
    };
    
    res.render("urls_index", templateVars);

  } else {

<<<<<<< HEAD
// add a new route handler for "/urls" and use res.render() to pass the URL data to our template.
app.get('/urls', (req, res) =>{

  const id = req.cookies.user_id;
  const user = id ? users[id] : null;

  if (user) {
    let templateVars = { urls: usersLink(urlDatabase, id), user };
    res.render("urls_index", templateVars);

  } else {
    res.status(403).send("Please login or register first.")

=======
    let templateVars = {
      urls: usersLink(urlDatabase, id),
      user,
      error:"Please login or register as new user...."
    };
    res.render("urls_index", templateVars);
    //res.status(403).send("Please login or register first.")
>>>>>>> modifying
    return;
  }
});

//Adding a new route to input login email and password
app.get('/login', (req, res) => {

  let templateVars = {
    user: users[req.session.user_id],
    email: users[req.session.email],
    password: users[req.session.password],
    retype: users[req.session.retype],
  };
  res.render("urls_login", templateVars);
});

// Adding a new route to input registration and password
app.get("/registration", (req, res) => {
  let templateVars = {
    user: users[req.session.user_id],
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render("urls_registration", templateVars);
});


//Adding a GET Route to Show the Form
app.get("/new", (req, res) => {

  if (!req.session.user_id) {
    return res.redirect('login');
  }

  let templateVars = {
    user: users[req.session.user_id],
    username: req.session.username,
    urls: urlDatabase
  };
  res.render("urls_new", templateVars);
});

// Adding a new route
app.get("/urls/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]["longURL"];
  if (!longURL) {
    console.error(`Long URL not found in database!  Make sure that the POST request actually added to the databse`);
    console.log(urlDatabase);
  }
  let templateVars = {
    user: users[req.session.user_id],
    username: req.session.username,
    shortURL: req.params.shortURL,
    longURL: longURL
  };
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

// Post that add new short url for user 

app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = genRanId();

  urlDatabase[shortURL] = {
    longURL: longURL,
    userID: req.session.user_id
  };

  res.redirect('/urls');
})


// Add a POST route that removes a URL resource, update urls_index.ejs
app.post("/urls/:shortURL/delete", (req, res) => {

  console.log("DELETE HERE");

  const urlId = req.params.shortURL;

  delete urlDatabase[urlId];
  
  res.redirect("/urls");
});


// Add a post to edit form 
app.post("/urls/:shortURL", (req, res) => {
  console.log("EDITING Form");

  const shortURL = req.params.shortURL;
  const longURL = req.body.fname;
  updateUrl(shortURL, longURL);

  res.redirect("/urls");
});

///New post login/////
app.post("/login", (req, res) => {

  const email = req.body.email
  const password = req.body.password
  const retype = req.body.retype


  if (!email || !password || !retype) {

    res.status(403).send("403 ERROR FOUND: Missing a value input.....")

    return;
  }

  for (let user in users) {

    const currentUser = users[user];
    const passEncrypt = bcrypt.compareSync(password, currentUser.password);
    const reEncrypt = bcrypt.compareSync(retype, currentUser.retype)

    if (currentUser.email === email && passEncrypt && reEncrypt) {

      //console.log("match to a user in data base")
      req.session.user_id = currentUser.id
      res.redirect("/urls");

      return;
    }
  }

  
  res.status(403).send("403 ERROR FOUND:Invalid email or password combination......");

});

// Add a post that removes cookie when logged out button is pressed
app.post("/logout", (req, res) => {

  console.log("LOGGING OUT USER")
  let user = req.body.id;
  req.session = null; // to delete cookies in session library 

  res.redirect("/login")
})


app.post('/registration', (req, res) => {

  console.log("REGISTER NEW USER");

  const username = req.body.username
  const password = req.body.password
  const retype = req.body.retype
  const email = req.body.email


  let newId = genRanId()

  let newData = {
    id: newId,
    password: bcrypt.hashSync(password, 4),
    retype: bcrypt.hashSync(password, 4),
    email: email
  }


  if (!newData.email || !newData.password || !newData.retype) {
    res.status(400).send("400 ERROR CODE FOUND: please input missing email or password..........")
  }

  for (val in users) {
    if (newData.email === users[val].email) {
      res.status(400).send("400 ERROR CODE FOUND: This Email already exist, please try again..........")
      return;
    }
  }


  users[newId] = newData;
  req.session.user_id = newId
  res.redirect("/urls")
  console.log(users)

})


app.listen(PORT, () => {
  console.log(`Tinyapp listening on port ${PORT}!`);
});
