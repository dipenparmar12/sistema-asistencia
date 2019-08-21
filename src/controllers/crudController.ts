import { getRepository, EntityRepository } from 'typeorm'

class CrudController {
	public async get(repo?) {
		const repository = getRepository(repo)
		return await repository.find()
	}
}

export default new CrudController()
