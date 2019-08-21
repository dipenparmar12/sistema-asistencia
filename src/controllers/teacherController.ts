import { Request, Response } from 'express'

export class TeacherController {
	public get() {}

	public getContacts(req: Request, res: Response) {
		Contact.find({}, (err, contact) => {
			if (err) {
				res.send(err)
			}
			res.json(contact)
		})
	}
}
