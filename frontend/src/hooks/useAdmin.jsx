import useEventos from "./useEventos"
import useAuth from "./useAuth"

const useAdmin = () => {
  const { event } = useEventos()
  const { auth } = useAuth()

  return event.creator === auth._id
}

export default useAdmin;
