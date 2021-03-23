/**
 *
 * Created by Smarttkow on 4/5/17.
 */
import * as http from "http";
import {app} from "../app";

const port: number = 3000;

//TODO: add error event
const server = http.createServer(app as any)
    .listen(port);

server.on("listening", () => {
    console.log(`server listening on port ${port}`);
});

server.on("error", (err:Error) => {
    console.log(err);
});