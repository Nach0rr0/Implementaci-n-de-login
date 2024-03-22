function auth(req, res, next) {
  if (req.session && req.session.role === "admin") {
    return next();
  } else {
    return res.status(401).send("<p>Para acceder a esta página, necesitas iniciar sesión como administrador</p>");
  }
}

export default auth;

