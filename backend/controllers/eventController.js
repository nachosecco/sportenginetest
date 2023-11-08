import Event from "../models/Event.js";
import User from "../models/User.js";

const obtenerEventos = async (req, res) => {
    const eventos = await Event.find({
        $and: [
            {
                $or: [
                    { colaborators: { $in: [req.user] } },
                    { creator: { $eq: req.user } }
                ]
            },
            { deactivated: { $ne: true } }
        ]
    }).select('-tasks');

    res.json(eventos);
};

const nuevoEvento = async (req, res) => {
    const event = new Event(req.body)
    event.creator = req.user._id;//Migrate to Owner. 

    //TODO: Investigate how to set Team (Opponent) if event is a Match
    //event.teams = req.body.teams;
    //TODO: Matches are Events, but not all the events are Matches
    //event.matchDate = req.body.matchDate;
    event.location = req.body.location;

    try {
        const eventoAlmacenado = await event.save()
        res.json(eventoAlmacenado);
    } catch (error) {
        console.log(error)
    }
};

const deactivateEvent = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    
    if(!event) {
        const error = new Error('Event not found');
        return res.status(404).json({msg: error.message});
    }

    event.deactivated = true;
    const updatedEvent = await event.save();
    res.json({ msg: 'Event deactivated', updatedEvent });
};

const changeOwnership = async (req, res) => {
    const { id } = req.params;
    const { newOwnerId } = req.body;
    const event = await Event.findById(id);
    
    if(!event) {
        const error = new Error('Event not found');
        return res.status(404).json({msg: error.message});
    }

    const newOwner = await User.findById(newOwnerId);
    if(!newOwner) {
        const error = new Error('New owner not found');
        return res.status(404).json({msg: error.message});
    }

    event.creator = newOwnerId;
    const updatedEvent = await event.save();
    res.json({ msg: 'Ownership changed', updatedEvent });
};


const obtenerEvento = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id)
        .populate({ path: 'tasks', populate: { path: 'completed' , select: "name"} })
        .populate('colaborators', 'name email');
    
    if(!event) {
        const error = new Error('Evento no encontrado');
        return res.status(404).json({msg: error.message});
    }

    if(event.creator.toString() !== req.user._id.toString() && 
        !event.colaborators.some( 
            colaborator => colaborator._id.toString() == req.user._id.toString()
        )){
            const error = new Error('Acción no valida');
            return res.status(401).json({ msg: error.message });
    }
    
    res.json(
        event,
    );

};

const editarEvento = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    
    if(!event) {
        const error = new Error('Evento no encontrado');
        return res.status(404).json({msg: error.message});
    }

    if(event.creator.toString() !== req.user._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(401).json({ msg: error.message });
    }


    event.name = req.body.name || event.name;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.client = req.body.client || event.client;

    try {
        const eventoAlmacenado = await event.save();
        res.json(eventoAlmacenado);
    } catch (error) {
        console.log(error)
    }


};

const eliminarEvento = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    
    if(!event) {
        const error = new Error('Evento no encontrado');
        return res.status(404).json({msg: error.message});
    }

    if(event.creator.toString() !== req.user._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(401).json({ msg: error.message });
    }

    try {
        event.deactivated = true;
        const updatedEvent = await event.save();
        res.json({ msg: 'Proyecto eliminado', updatedEvent });
    } catch (error) {
        console.log(error)
    }
};

const buscarColaborador = async (req, res) => {
    const {email} = req.body;
    const usuario = await User.findOne({email}).select('-confirmed -createdAt -password -token -updatedAt -__v ')

    if (!usuario) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msg:error.message})
    }
    res.json(usuario)
};

const agregarColaborador = async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        const error = new Error('Evento no encontrado');
        return res.status(404).json({msg: error.message});
    }
    if(event.creator.toString() !== req.user._id.toString() ){
        const error = new Error('Acción no valida');
        return res.status(404).json({msg: error.message});
    }
    const {email} = req.body;
    const usuario = await User.findOne({email}).select('-confirmed -createdAt -password -token -updatedAt -__v ')

    if (!usuario) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msg:error.message})
    }

    if(event.creator.toString() === usuario._id.toString() ) {
        const error = new Error('El creador del evento no puede ser un invitado')
        return res.status(404).json({msg:error.message})
    }

    if(event.colaborators.includes(usuario._id)) {
        const error = new Error('Este invitado ya está registrado en el evento')
        return res.status(404).json({msg:error.message})
    }

    event.colaborators.push(usuario._id);
    await event.save()
    res.json({msg: 'Invitado agregado correctamente'});
};

const eliminarColaborador = async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        const error = new Error('Evento no encontrado');
        return res.status(404).json({msg: error.message});
    }
    if(event.creator.toString() !== req.user._id.toString() ){
        const error = new Error('Acción no valida');
        return res.status(404).json({msg: error.message});
    }
    

    event.colaborators.pull(req.body.id);
    await event.save()
    res.json({msg: 'Invitado eliminado correctamente'});

};

export {
    obtenerEventos,
    nuevoEvento,
    obtenerEvento,
    editarEvento,
    eliminarEvento,
    agregarColaborador,
    eliminarColaborador,
    buscarColaborador,
    deactivateEvent,
    changeOwnership
};