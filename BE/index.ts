import express from 'express';
import { Request, Response } from 'express';
import 'dotenv/config'
import mongoose from "mongoose";
import glob from "glob";

const APP = express();

//route bundeling
glob("./routes/**/*ts", (err: Error, files: Array<string>) => {
  if (err) throw err;
  files.forEach(file => APP.use(require(file)))
})

mongoose.connect("mongodb+srv://user123:Password123*@cluster0.2cqegnk.mongodb.net/Mern?retryWrites=true&w=majority")

APP.get('/', (req: Request, res: Response) => {
  res.send('APPlication worksddd!');
});

APP.listen(process.env.PORT, () => {
  console.log(`\x1b[36m\[server]: DB status:\x1b[33m ${mongoose.connection.readyState}`)
  console.log('\x1b[36m%s\x1b[0m',`[server]: listening on port ${process.env.PORT}`);
});
