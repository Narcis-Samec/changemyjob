import express from 'express';
import { Request, Response } from 'express';
import 'dotenv/config'
import mongoose from "mongoose";
import glob from "glob";
import cookieParser from "cookie-parser"
import Auth from './middleware/Auth';

const APP = express();

//middleware
APP.use(express.urlencoded({ extended: true }))
APP.use(express.json())
APP.use(cookieParser())
APP.get("*", Auth.chcekUser)
APP.patch("*", Auth.chcekUser)

//route bundeling
glob("./routes/**/*ts", (err, files) => {
  if (err) throw err;
  files.forEach(file => APP.use(require(file)))
})

mongoose.connect("mongodb+srv://user123:Password123*@cluster0.2cqegnk.mongodb.net/Mern?retryWrites=true&w=majority")

APP.get('/', (req: Request, res: Response) => {
  res.send('Application is running');
});

APP.listen(process.env.PORT, () => {
  console.log(`\x1b[36m\[server]: DB status:\x1b[33m ${mongoose.connection.readyState}`)
  console.log('\x1b[36m%s\x1b[0m',`[server]: listening on port ${process.env.PORT}`);
});
