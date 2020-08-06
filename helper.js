const getUserByEmail = function (email, database) {
    for (let user in database) {
      if (database[user].email === email) {
        return database[user].id;
      }
    }
}


module.exports = {getUserByEmail}