import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import { db } from "./config/db.js";
import { mainRouter } from "./routes/index.js";
import passport from 'passport'
import { jwtStrategy }  from './config/passport.js'
//routes
const app = express();

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

db.authenticate()
	.then(() => console.log("Database Authenticated!!!"))
	.catch((err) => console.log(err));

db.sync()
	.then(() => console.log("Database Synced!!!"))
	.catch((err) => console.log(err));


app.use(express.json());
app.use(cors());

app.use("/api", mainRouter);

const PORT = config.PORT;

app.listen(PORT, () => {
	console.log(`server listen on http://localhost:${PORT}`);
});