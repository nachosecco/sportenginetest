import { useContext } from "react";
import GenerationContext from "../context/GenerationProvider";

export const useGenerations = () => useContext(GenerationContext);