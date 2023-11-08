import useAuth from "./useAuth"
import { useGenerations } from "./useGenerations"

const useCoach = () => {
  const { generation } = useGenerations();
  const { auth } = useAuth();

  return generation.coach === auth._id
}

export default useCoach;