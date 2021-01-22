module.exports = {
    mascotas: [
        { nombre: 'Bambi', dueno: 'Luchito', tipo: 'Perro' },
        { nombre: 'Misha', dueno: 'Luchito', tipo: 'Gato' },
        { nombre: 'Sasha', dueno: 'Luchito', tipo: 'Perro' },
    ],
    veterinarixs: [
        { dni: '40536830', nombre: 'Luciano', apellido: 'de la Iglesia', pais: 'Argentina' },
        { dni: '42656320', nombre: 'Ailen', apellido: 'Aguino', pais: 'Argentina' },
        { dni: '11111111', nombre: 'El', apellido: 'Pepe', pais: 'Colombia' },
    ],
    duenos: [
        { dni: '40536830', nombre: 'Luciano', apellido: 'Dueño', pais: 'Argentina' },
        { dni: '42656320', nombre: 'Ailen', apellido: 'Dueña', pais: 'Argentina' },
        { dni: '11111111', nombre: 'El', apellido: 'Dueño', pais: 'Colombia' },
    ],
    consultas: [
        {
            mascota: 0,
            veterinarix: 0,
            historia: '',
            diagnostico: '',
            fechaCreacion: new Date(),
            fechaEdicion: new Date()
        },
    ]
};