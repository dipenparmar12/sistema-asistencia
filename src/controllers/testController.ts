import { Request, Response } from 'express'
import Student from '../entity/Student'
import Attendance from '../entity/Attendance'
import { getRepository } from 'typeorm'

class TestController {
	index = async (req: Request, res: Response) => {
		let data: any
		let sr = getRepository(Student)
		let ar = getRepository(Attendance)

		// data = await sr.find({ relations: ['attendances'] })
		data = await ar.find({ relations: ['student'] })

		res.send(data)
	}
}

export default new TestController()



// export let age: number = 20;
// export class Emp {
// 	eCode: number;
// 	eName: string;

// 	constructor(name: string, code: number) {
// 		this.eName = name
// 		this.eCode = eCode;
// 	}

// 	print() {
// 		console.log(`E code: ${this.eCode} E Name: ${this.eName}`)
// 	}
// }

// let Ename = New Emp(1, 'Dipends')