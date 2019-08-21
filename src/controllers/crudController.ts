import { getRepository, Repository } from 'typeorm'
import Teacher from '../entity/Teacher'
import { Request, Response } from 'express-serve-static-core'

export class CrudController {
	public _data: String = 'This is CrudController'

	constructor(data?) {
		this._data = data
	}

	get data() {
		return this._data
	}

	crud() {
		console.log(`Hello, i am from crud: seted ${this.data}`)
		return 'crud()'
	}

	async testparent(req: Request, res: Response) {
		console.log()
		await res.send('CRUD Parent this')
	}

	async get() {
		const repository = getRepository(Teacher)
		return await repository.find()
	}
}

// export default new CrudController()
