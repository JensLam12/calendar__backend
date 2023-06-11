const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');
    
    res.status(201).json({
        ok: true,
        events
    });
}

const createEvent = async (req, res = response) => {
    
    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        return res.status(201).json({
            ok: true,
            event: savedEvent
        });

    } catch( error){
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateEvent = async (req, res = response) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventoId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Event.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            event: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteEvent = async (req, res = response) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventoId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}