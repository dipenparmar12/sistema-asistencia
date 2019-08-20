import 'reflect-metadata';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createConnection, Connection } from 'typeorm';
import appRoutes from './routes/indexRoutes';
import Teacher from './entity/Teacher';

dotenv.config();

class MyApplication {
	public _express: express.Application = express();
	public port: number = parseInt(process.env.PORT);
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
		this._express.use(helmet());
		this._express.use(bodyParser.json());
		this._express.use(bodyParser.urlencoded({ extended: false }));
		this._express.use(express.static('public'));
		this._express.use('/', express.static(path.join(__dirname, '../public')));
	}

	/**
	 * Set All Application Routes from External Class's
	 */
	private appRoutes(): void {
		this._express.use(appRoutes);
	}

	public test(): string {
		return ' testString(): ';
	}

	/**
	 * Database Connection and Configration
	 */
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

export default new MyApplication();
