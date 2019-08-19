import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection, Connection, getConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { TeacherRoutes } from './routes/TeacherRoutes';
import * as path from 'path';

// initialize configuration
dotenv.config();

class MyApplication {
	public _express: express.Application = express();
	public port: number = parseInt(process.env.PORT);
	public teacherRoutes: TeacherRoutes = new TeacherRoutes();

	constructor() {
		this.appConfig();
		this.appRoutes();
		// const connection = getConnection();
		this._express.listen(this.port, () => {
			console.log(process.env.APP_NAME + ': Started:server.js At:' + this.port);
		});
	}

	/**
	 * Express Midallwares & other configration ( Cookies, static path ..etc )
	 */
	private appConfig(): void {
		this._express.use(bodyParser.json());
		this._express.use(bodyParser.urlencoded({ extended: false }));

		// serving static files
		this._express.use(express.static('public'));

		//// Public Dir
		this._express.use('/', express.static(path.join(__dirname, '../public')));
	}

	/**
	 * Set All Application Routes from External Class's
	 */
	private appRoutes(): void {
		this.teacherRoutes.routes(this._express);
	}
}

new MyApplication();

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
