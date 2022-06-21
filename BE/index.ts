import express from 'express';
import { Request, Response } from 'express';
import 'dotenv/config'
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb+srv://user123:Password123*@cluster0.2cqegnk.mongodb.net/Mern?retryWrites=true&w=majority")

app.get('/', (req: Request, res: Response) => {
  res.send('Application worksddd!');
});

app.listen(process.env.PORT, () => {
  console.log(`\x1b[36m\[server]: DB status:\x1b[33m ${mongoose.connection.readyState}`)
  console.log('\x1b[36m%s\x1b[0m',`[server]: listening on port ${process.env.PORT}`);
});
