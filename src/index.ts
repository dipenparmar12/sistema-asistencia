import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { createConnection, Connection, getConnection, getRepository } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { TeacherRoutes } from './routes/TeacherRoutes';
import * as path from 'path';
import Teacher from './entity/Teacher';

// initialize configuration
dotenv.config();

class MyApplication {
	public _express: express.Application = express();
	public port: number = parseInt(process.env.PORT);
	public teacherRoutes: TeacherRoutes = new TeacherRoutes();
	db: Connection;

	constructor() {
		this.appConfig();
		this.appRoutes();
		this.conn();
		this._express.listen(this.port, () => {
			console.log(process.env.APP_NAME + ', Started At:' + this.port);
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

	public test(): string {
		return ' testString(): ';
	}

	public async conn() {
		this.db = await createConnection({
			type: 'mysql',
			host: process.env.DB_HOST,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			entities: [Teacher],
			synchronize: true,
		});

		// const tRepo = getRepository(Teacher);
		// const teachers = await tRepo.find();
		// console.log(teachers);
	}
}

export default new MyApplication()._express;

//
//
//

//Connects to the Da  tabase -> then starts the express
// createConnection()
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

// 		app.get('', async (req, res) => {
// 			const teacherRepository = getRepository(Teacher);
// const teachers = await teacherRepository.find();
// console.log(teachers);

// 			//Send the teachers object
// 			let n = new Teacher();
// 			n.name = 'dk';
// 			n.password = 'name';
// 			n.username = 'name';
// 			n.subject = 'php';

// 			teacherRepository.save(n);
// 			res.send(teachers);
// 		});
// 	})
// 	.catch(error => console.log(error));
