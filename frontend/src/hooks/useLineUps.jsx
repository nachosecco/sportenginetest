import { useContext } from "react";
import LineUpContext from "../context/LineUpProvider";

export const useLineUps = () => useContext(LineUpContext);