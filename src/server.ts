import { createConnections, Connection } from 'typeorm';

export class Conn {
	private DBNAME = process.env.DBNAME;
	private DBUSER = process.env.DBUSER;
	private DBPASSWORD = process.env.DBPASSWORD;
	private DBMS_TYPE = process.env.DBMS_TYPE;
	private host = process.env.host;
	constructor() {}
}
