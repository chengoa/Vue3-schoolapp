import express,{Express} from 'express';
import {server as gql_server} from "./graphql";
import {useRouter} from "./router"
import cors from "cors"
import { Socket } from 'socket.io';

interface Date {
    name: string,
    room: string
}

const config = require("../config")
const app:Express = express()

const http = require('http').Server(app)
export const io = require('socket.io')(http,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
        Credentials: true
    }
})



app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

// 静态资源 “前缀路径”
app.use("/assets",express.static("./static"))

useRouter(app)

gql_server.applyMiddleware({
    app,
    path:"/gql"
})

http.listen(config.port,() => console.log(`${config.port} run`))