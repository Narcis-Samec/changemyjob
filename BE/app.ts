import 'dotenv/config'
import mongoose from "mongoose";
import createServer from "./utils/server"

const app = createServer()

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`\x1b[36m\[server]: DB status:\x1b[33m ${mongoose.connection.readyState}`)
    console.log('\x1b[36m%s\x1b[0m', `[server]: listening on port ${process.env.PORT}`);
  })
}

export default app