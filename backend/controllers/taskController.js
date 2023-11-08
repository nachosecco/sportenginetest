import Event from "../models/Event.js"; 
import Task from "../models/Task.js"; 



const addTask = async (req, res) => {
    const { event } = req.body;
    const existingEvent = await Event.findById(event);

    if (!existingEvent){
        const error = new Error("El evento no existe");
        return res.status(404).json({ msg: error.message });
    }
    if(existingEvent.creator.toString() !== req.user._id.toString()){
        const error = new Error("No tienes los permisos adecuados para añadir tareas");
        return res.status(404).json({ msg: error.message });
    }

    try {
        const savedTask = await Task.create(req.body);
        // almacenar id en el evento
        existingEvent.tasks.push(savedTask._id);
        await existingEvent.save();
        res.json(savedTask);
    } catch (error) {
        console.log(error)
    }
};

const getTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate("event");

    if(!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ msg: error.message });
    }

    if (task.event.creator.toString() !== req.user._id.toString()){
        const error = new Error("Acción no valida");
        return res.status(403).json({ msg: error.message });
    }

    res.json(task);

};

const editTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate("event");

    if(!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ msg: error.message });
    }

    if (task.event.creator.toString() !== req.user._id.toString()){
        const error = new Error("Acción no valida");
        return res.status(403).json({ msg: error.message });
    }

    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;

    try {
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (error) {
        console.log(error);
    }

};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate("event");

    if(!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ msg: error.message });
    }

    if (task.event.creator.toString() !== req.user._id.toString()){
        const error = new Error("Acción no valida");
        return res.status(403).json({ msg: error.message });
    }
    try {
        const event = await Event.findById(task.event)
        event.tasks.pull(task._id)
        await Promise.allSettled([await event.save(), await task.deleteOne() ])
        res.json({ msg: "La Tarea se eliminó correctamente"});
    } catch (error) {
        console.log(error);
    }
};

const changeStateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate("event");

    if(!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ msg: error.message });
    }

    if (task.event.creator.toString() !== req.user._id.toString() && !task.event.colaborators.some( 
        colaborator => colaborator._id.toString() == req.user._id.toString()
    )) {{
        const error = new Error("Acción no valida");
        return res.status(403).json({ msg: error.message });
        }
    };
    task.state = !task.state
    task.completed = req.user._id
    await task.save()

    const updatedTask = await Task.findById(id)
        .populate("event")
        .populate("completed")

    res.json(updatedTask)
}

export {
    addTask,
    getTask,
    editTask,
    deleteTask,
    changeStateTask
}