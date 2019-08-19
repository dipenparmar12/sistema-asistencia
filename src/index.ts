import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection, Connection, getConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { TeacherRoutes } from './routes/TeacherRoutes';
import * as https from 'https';
import * as path from 'path';

// initialize configuration
dotenv.config();

class App {
	public app: express.Application = express();
	public teacherRoutes: TeacherRoutes = new TeacherRoutes();

	constructor() {
		this.appConfig();
		this.appRoutes();
		// const connection = getConnection();
		this.app.listen(process.env.PORT, () => {
			console.log('Started:server.js At:' + process.env.PORT);
		});
	}

	private appConfig(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));

		// serving static files
		this.app.use(express.static('public'));

		//// Public Dir
		this.app.use('/', express.static(path.join(__dirname, '../public')));
	}

	private appRoutes(): void {
		this.teacherRoutes.routes(this.app);
	}
}

export const app: App = new App();

// https.createServer(new App().app).listen(8000, () => {
// 	console.log('APp Started');
// });

// export default new App().app;

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
