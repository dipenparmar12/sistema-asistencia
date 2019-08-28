import Teacher from '../entity/Teacher'
import { getRepository } from 'typeorm'
import * as fs from 'fs'
import * as csv from 'fast-csv'
import multer = require('multer')

const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, './uploads')
		},
		/// store file with jwt_token + orignal_name
		filename: (req, file, cb) => {
			let filename_without_ext = file.originalname.split('.')[0]
			// let file_extension = file_name_array[file_name_array.length - 1]
			cb(null, req.cookies.jwt + '_' + filename_without_ext + '.jpg')
		},
	}),
	/// Check File type must be png,jpg,jpeg only
	fileFilter: (req, file, cb) => {
		if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
			cb(null, true)
		} else {
			cb(null, false)
			return cb(new Error('Only .png, .jpg and .jpeg format allowed!'), null)
		}
	},
}).array('profile_pic', 3)

const getTeacherObject_from_array = async teacherInput => {
	let teacher: Teacher = new Teacher()
	teacher.username = teacherInput.username
	teacher.password = teacherInput.password
	teacher.name = teacherInput.name
	teacher.subject = teacherInput.subject
	teacher.email = teacherInput.email
	teacher.mobile = teacherInput.mobile
	teacher.address = teacherInput.address
	teacher.roll = teacherInput.roll
	return teacher
	// let teacherRepository = getRepository(Teacher)
	// await teacherRepository.save(teacher)
	// console.log('Data inserted: ' + teacherInput.username)
}

const get_csv_Promise = new Promise((resolve, reject) => {
	let list: any = []
	fs.createReadStream('./docs/teacher1.csv')
		.pipe(csv.parse({ headers: true }))
		.on('data', teacher => {
			list.push(teacher)
		})
		.on('end', data => {
			resolve(list)
		})
})

export { upload, getTeacherObject_from_array, get_csv_Promise }
