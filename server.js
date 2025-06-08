const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json()); // Middleware para leer JSON en las solicitudes

// 📌 Endpoint POST /alumno
app.post("/alumno", (req, res) => {
    const { cuenta, nombre, promedio, grado, grupo } = req.body;

    if (!cuenta || !nombre || !promedio || !grado || !grupo) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    // Crear objeto de alumno
    const alumno = { cuenta, nombre, promedio, grado, grupo };

    // Guardar en archivo JSON
    fs.writeFile("alumnos.json", JSON.stringify(alumno, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Error al guardar el archivo." });
        }
        res.status(201).json({ mensaje: "Alumno guardado correctamente.", alumno });
    });
});

// 📌 Iniciar servidor en puerto 3000
app.listen(3000, () => {
    console.log("Servidor API corriendo en http://localhost:3000");
});
