import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection, Connection, getConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { Request, Response } from 'express';
import { Conn } from './server';

// initialize configuration
dotenv.config();

class App {
	public app: express.Application = express();

	constructor() {
		const connection = getConnection();
	}
}

export default new App().app;

// //Connects to the Da  tabase -> then starts the express
// createConnection({
// 	name: 'default',
// 	type: 'mysql',
// 	host: 'localhost',
// 	username: 'test',
// 	password: '',
// 	database: 'test',
// })
// 	.then(async connection => {
// 		// Create a new express application instance
// 		const app = express();

// 		// Call midlewares
// 		app.use(helmet());
// 		app.use(bodyParser.json());

// 		app.listen(process.env.PORT, () => {
// 			console.log('Server started on port ' + process.env.PORT);
// 		});

// 		//Set all routes from routes folder
// 		// app.use('/', routes);

// 		app.get('', (req: Request, res: Response) => {
// 			res.send('hhelo');
// 		});
// 	})
// 	.catch(error => console.log(error));
