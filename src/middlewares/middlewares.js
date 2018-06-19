import jwt from 'jsonwebtoken';

/* 6 Middleware for cookie parsing  */
export function setCoockies() {
  return function (req, res, next) {
    const cookies = req.headers.cookie;

    if (cookies) {
      const parsedCookies = cookies
      console.log('Parsed Cookies: ', parsedCookies);
      req.parsedCookies = parsedCookies;
    } else {
    /* add coockie if there're no coockies at all */
      const newCookieOptions = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
      };
      res.cookie('firstCoockie', 'first_coockie_value', newCookieOptions);
    }

    next();
  }
}

/* 7 Middleware for query parsing  */
export function queryParser() {
  return function(req, res, next) {
    const { query } = req;
    req.parsedQuery = query;
    console.log('Parsed Query: ', query);
    next();
  }
}

/* middleware to verify JWT token */
export function checkToken(req, res, next) {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, 'secret13', (err) => {
      if (err) {
        return res.status(401).json({ message: 'Unathorized: Invalid authorization token' });
      }

      next();
    });
  } else {
    res.status(401).send({ message: 'Unathorized: No token provided' });
  }
}

