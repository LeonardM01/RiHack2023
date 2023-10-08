import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config, supabaseAdmin } from "./config/config.js";
import { Logging } from "./helpers/Logging.js";

const router = express();
const server = http.createServer(router).listen(config.server.port, () =>
  Logging.info(`Server is running on port ${config.server.port}`)
);
import { Server } from "socket.io"
/*
mongoose
  .connect(config.db.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Mongo connected successfully.");
    StartServer();
  })
  .catch((error) => Logging.error(error));
 */

const StartServer = () => {
  /** Log the request */
  router.use((req, res, next) => {
    /** Log the req */
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  // router.use("/authors", authorRoutes);
  // router.use("/books", bookRoutes);

  /** Healthcheck */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ hello: "world" })
  );

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error("Not found");

    Logging.error(error);

    res.status(404).json({
      message: error.message,
    });
  });

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    })

  io.on('connection', (socket) => {
    // Handle when a new client connects

    // Handle when a client joins a room
    socket.on('joinRoom', (roomId, userId) => {
      socket.join(roomId);
      console.log(`${userId} joined room: ${roomId}`);
    });

    // Handle when a client sends a message to a room
    socket.on('message', async (roomId, message, sender) => {
      const a = await supabaseAdmin.from("messages").insert({
        text:message,
        conversation_id:roomId,
        sent_by:sender
      })
      console.log(a)
      io.to(roomId).emit("msg",{message,sender});
    });

    // Handle when a client disconnects
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

StartServer()
