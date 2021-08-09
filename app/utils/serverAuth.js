/**
 * For authenticating username and password.
 *
 * @param username - username of user, type string
 * @param password - password of user, type string
 */
exports.authenticate = async (username, password) => {
  console.log(
    `Matching username entered: ${username}, password entered: ${password}`
  );
  console.log(
    `with stored values: ${process.env.USERNAME} and ${process.env.PASSWORD}`
  );
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    console.log('Matched username and password.');
    return {
      username,
      password,
      success: true,
    };
  } else return false;
};

/**
 * Determines whether user is authenticated.
 * @param req - request from api call
 */
exports.userAuthenticated = (req) => {
  // getting signed cookies, with default of {} if there is no signed cookies
  const { signedCookies = {} } = req;
  const { token } = signedCookies;

  // check if token exists
  if (token && token.email) {
    console.log('Matched token and email from signed cookies');
    return true;
  } else {
    return false;
  }
};
