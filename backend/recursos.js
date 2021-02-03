module.exports = {
    mascotas: [
        { nombre: 'Bambi', dueno: 'Luchito', tipo: 'Perro' },
        { nombre: 'Misha', dueno: 'Luchito', tipo: 'Gato' },
        { nombre: 'Sasha', dueno: 'Luchito', tipo: 'Perro' },
    ],
    veterinarixs: [
        { dni: '40536830', nombre: 'Luciano', apellido: 'de la Iglesia' },
        { dni: '42656320', nombre: 'Ailen', apellido: 'Aguino' },
        { dni: '11111111', nombre: 'El', apellido: 'Pepe' },
    ],
    duenos: [
        { dni: '40536830', nombre: 'Luciano', apellido: 'Dueño' },
        { dni: '42656320', nombre: 'Ailen', apellido: 'Dueña' },
        { dni: '11111111', nombre: 'El', apellido: 'Dueño' },
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