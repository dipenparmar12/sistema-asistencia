import { Router, Request, Response } from 'express'
import multer = require('multer')

let route = Router()

const imageUploader = () => {
	return multer({
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, './uploads')
			},
			filename: (req, file, cb) => {
				cb(null, file.fieldname + '-' + Date.now())
			},
		}),

		fileFilter: (req, file, callBack) => {
			// console.log(file)
			if (file.mimetype + ''.startsWith('image')) {
				callBack(null, true)
			} else {
				callBack(new Error('Only image files are allowed!'), false)
			}
		},
	})
}

route.get('/registration', (req: Request, res: Response) => {
	res.render('student_registration')
})

route.post('/registration', imageUploader().single('profile_pic'), (req: Request, res: Response) => {
	res.send('FileUploaded')
})

route.get('/index', (req: Request, res: Response) => {
	res.render('index')
})

route.get('/attendance', (req: Request, res: Response) => {
	res.render('attendance')
})

route.get('/dashboard', (req: Request, res: Response) => {
	res.render('dashboard')
})

export default route
