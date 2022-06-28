import 'dotenv/config'
import mongoose from "mongoose";
import createServer from "./utils/server"

/**
 * Welcome to change my job app.ts
 * @author Alan Kovac
 */
const app = createServer()

/* istanbul ignore next */ 
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`\x1b[36m\[server]: DB status:\x1b[33m${mongoose.connection.readyState}\x1b[0m`)
    console.log('\x1b[36m%s\x1b[0m', `[server]: listening on port:\x1b[33m${process.env.PORT}\x1b[0m`);
  })
}

export default app