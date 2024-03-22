import { Router } from "express";
import UserModel from "../models/user.model.js";
import { auth } from "../middleware/index.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await UserModel.findOne({ username, password });
  if (result === null) {
    res.status(400).json({
      error: "Usuario o Contraseña invalidos",
    });
  } else {
    if (username === "admin@coder.com" && password === "admin123") {
      req.session.user = username;
      req.session.role = "admin";
    } else {
      req.session.user = username;
      req.session.role = result.role || "usuario";
    }
       console.log(req.session);
    res.status(200).json({
      message: "ok",
    });
  }
});

router.get("/privado", auth, (req, res) => {
  try {
    res.render("privado", { title: "privado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const newUser = {
    username,
    password,
    role: "usuario",
  };

  const result = await UserModel.create({
    username,
    password,
    role: "usuario",
  });

  if (result === null) {
    res.status(400).json({
      message: "Error al crear user",
    });
  } else {
    req.session.user = username;
    req.session.role = newUser.role || "usuario";
    res.status(201).json({
      message: "User creado con exito",
      data: result,
    });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({
        error: "Error al cerrar sesión",
      });
    } else {
      res.redirect("/login"); 
    }
  });
});

export default router;
