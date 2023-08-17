const express = require("express")
const {createServer} = require("http")
const { Server } = require("socket.io")



const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

app.route("/").get((req,res)=>{
    res.json("Hey there welcome again on JKS");
});

io.on("connection",(socket)=>{
    socket.join("edhaut_group");
    console.log("backend connected");
    socket.on("sendMsg",(msg)=>{
        console.log("msg",msg);
        io.to("edhaut_group").emit("sendMsgServer",{...msg,type:"otherMsg"});

    });
});


httpServer.listen(3000);


