import axios from "axios"
import {IP_ADDRESS} from "@env"

export const api = axios.create({
    baseURL: `http://${IP_ADDRESS}:3333`
})