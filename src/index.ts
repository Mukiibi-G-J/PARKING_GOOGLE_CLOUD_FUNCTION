import { HttpFunction } from "@google-cloud/functions-framework";



export const hello:HttpFunction = async (req, res) =>{
    res.send("Hello World")
}