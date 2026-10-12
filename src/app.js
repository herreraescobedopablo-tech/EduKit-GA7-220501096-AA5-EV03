
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Base de datos temporal
const usuarios = [];
const donaciones = [];

let siguienteIdDonacion = 1;

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "API de EduKit funcionando correctamente"
    });
});

// Consultar usuarios
app.get("/api/usuarios", (req, res) => {
    res.json(usuarios.map(({ contrasena, ...usuario }) => usuario));
});

// Registrar usuario
app.post("/api/registro", (req, res) => {
    const { usuario, contrasena } = req.body || {};

    if (
        typeof usuario !== "string" || !usuario.trim() ||
        typeof contrasena !== "string" || !contrasena.trim()
    ) {
        return res.status(400).json({
            error: "El usuario y la contraseña son obligatorios"
        });
    }

    const nombreUsuario = usuario.trim();

    const usuarioExistente = usuarios.find(
        (item) => item.usuario === nombreUsuario
    );

    if (usuarioExistente) {
        return res.status(409).json({
            error: "El usuario ya está registrado"
        });
    }

    usuarios.push({
        usuario: nombreUsuario,
        contrasena
    });

    res.status(201).json({
        mensaje: "Usuario registrado correctamente"
    });
});

// Iniciar sesión
app.post("/api/login", (req, res) => {
    const { usuario, contrasena } = req.body || {};

    const usuarioEncontrado = usuarios.find(
        (item) =>
            item.usuario === usuario &&
            item.contrasena === contrasena
    );

    if (!usuarioEncontrado) {
        return res.status(401).json({
            error: "Error en la autenticación"
        });
    }

    res.status(200).json({
        mensaje: "Autenticación satisfactoria"
    });
});

// Consultar todas las donaciones
app.get("/api/donaciones", (req, res) => {
    res.json(donaciones);
});

// Consultar una donación por su ID
app.get("/api/donaciones/:id", (req, res) => {
    const id = Number(req.params.id);

    const donacion = donaciones.find(
        (item) => item.id === id
    );

    if (!donacion) {
        return res.status(404).json({
            error: "Donación no encontrada"
        });
    }

    res.json(donacion);
});

// Crear una donación
app.post("/api/donaciones", (req, res) => {
    const {
        titulo,
        descripcion,
        categoria,
        cantidad,
        ubicacion,
        donante
    } = req.body || {};

    if (
        typeof titulo !== "string" || !titulo.trim() ||
        typeof descripcion !== "string" || !descripcion.trim() ||
        typeof categoria !== "string" || !categoria.trim() ||
        typeof ubicacion !== "string" || !ubicacion.trim() ||
        typeof donante !== "string" || !donante.trim() ||
        cantidad === undefined || cantidad === null ||
        cantidad === "" || !Number.isInteger(Number(cantidad)) ||
        Number(cantidad) < 1
    ) {
        return res.status(400).json({
            error: "Completa los campos y registra una cantidad entera mayor que cero"
        });
    }

    const nuevaDonacion = {
        id: siguienteIdDonacion++,
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        categoria: categoria.trim(),
        cantidad: Number(cantidad),
        ubicacion: ubicacion.trim(),
        donante: donante.trim(),
        estado: "Disponible"
    };

    donaciones.push(nuevaDonacion);

    res.status(201).json({
        mensaje: "Donación publicada correctamente",
        donacion: nuevaDonacion
    });
});

// Actualizar una donación
app.put("/api/donaciones/:id", (req, res) => {
    const id = Number(req.params.id);

    const donacion = donaciones.find(
        (item) => item.id === id
    );

    if (!donacion) {
        return res.status(404).json({
            error: "Donación no encontrada"
        });
    }

    const camposPermitidos = [
        "titulo",
        "descripcion",
        "categoria",
        "cantidad",
        "ubicacion",
        "donante",
        "estado"
    ];

    const datos = req.body || {};
    const camposEnviados = Object.keys(datos);

    if (camposEnviados.length === 0) {
        return res.status(400).json({
            error: "Debes enviar al menos un campo para actualizar"
        });
    }

    const campoInvalido = camposEnviados.some(
        (campo) => !camposPermitidos.includes(campo)
    );

    if (campoInvalido) {
        return res.status(400).json({
            error: "Uno o más campos no están permitidos"
        });
    }

    for (const campo of camposEnviados) {
        if (
            typeof datos[campo] !== "string" ||
            !datos[campo].trim()
        ) {
            if (campo !== "cantidad") {
                return res.status(400).json({
                    error: `El campo ${campo} no puede estar vacío`
                });
            }
        }
    }

    if (
        datos.cantidad !== undefined &&
        (
            datos.cantidad === null ||
            datos.cantidad === "" ||
            !Number.isInteger(Number(datos.cantidad)) ||
            Number(datos.cantidad) < 1
        )
    ) {
        return res.status(400).json({
            error: "La cantidad debe ser un entero mayor que cero"
        });
    }

    if (
        datos.estado !== undefined &&
        !["Disponible", "Reservada", "Entregada"].includes(datos.estado)
    ) {
        return res.status(400).json({
            error: "El estado debe ser Disponible, Reservada o Entregada"
        });
    }

    for (const campo of camposEnviados) {
        donacion[campo] =
            campo === "cantidad"
                ? Number(datos[campo])
                : datos[campo].trim();
    }

    res.json({
        mensaje: "Donación actualizada correctamente",
        donacion
    });
});

// Eliminar una donación
app.delete("/api/donaciones/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = donaciones.findIndex(
        (item) => item.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            error: "Donación no encontrada"
        });
    }

    donaciones.splice(indice, 1);

    res.json({
        mensaje: "Donación eliminada correctamente"
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
