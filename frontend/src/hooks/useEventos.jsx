import {useContext} from "react";
import EventosContext from "../context/EventosProvider";

const useEventos = () => {
    return useContext(EventosContext)
}

export default useEventos;