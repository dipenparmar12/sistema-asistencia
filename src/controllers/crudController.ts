import { getRepository, Repository } from 'typeorm'
import Teacher from '../entity/Teacher'
import { Request, Response } from 'express-serve-static-core'

export class CrudController {
	public _data: String = 'This is CrudController'

	get data() {
		return this._data
	}

	async test(req: Request, res: Response) {
		console.log(this)
		await res.send('CRUD Parent this' + this.data)
	}

	async getCrud() {
		const repository = getRepository(Teacher)
		return await repository.find()
	}
}

// export default new CrudController()
