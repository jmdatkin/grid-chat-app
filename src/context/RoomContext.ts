import { createContext } from "react";
import { Room } from "../types/Room";

export default createContext<Room | null>(null);