//fix check
const { assert } = require('chai');

const { getUserByEmail } = require('/../helperfunctions/helper.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {

  it('should return a user with valid email', () => {
    const user = getUserByEmail("user@example.com", testUsers)
    const expectedOutput = "userRandomID";


    // Write your assert statement here

    assert.strictEqual(expectedOutput, user)
  });

  it('should return undefined if value of email does not exist in data base', ()=>{

    const user = getUserByEmail('user5@example.com', testUsers)
    const expectedOutput = undefined;
    assert.strictEqual(expectedOutput, user);
    console.log(user);
    });

});