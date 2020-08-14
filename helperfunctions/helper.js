//fix check
const getUserByEmail = (email, database) => {
    for (let val in database) {
      if (database[val].email === email) {

        return database[val].id;
      }
    }
}


module.exports = {getUserByEmail}