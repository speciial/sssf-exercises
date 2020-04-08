"use strict";
/*
    TODO:
        [x] user database
        [x] user registration
        [x] user login
        [ ] authentication / jwt
        [ ] global chat room
        [ ] private chat rooms 
        [ ] frontend 
        [ ] 

    Where the fuck do you store the jwt on the client side?

 */

require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const db = require("./db/db");
const passport = require("./utils/passport");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(passport.initialize());

// Routes
app.use("/user", require("./routes/userRoute"));

// Socket experiments
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
  
    socket.on('disconnect', () => {
      console.log('a user disconnected', socket.id);
    });
  
    socket.on('chat message', (msg) => {
      console.log('message: ', msg);
      io.emit('chat message', msg);
    });
  });
  

db.on("connected", () => {
    http.listen(3000, console.log("Listening on port 3000"));
});

