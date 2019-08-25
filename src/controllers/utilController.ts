import multer = require('multer')

const imageUploader = () => {
	return multer({
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, './uploads')
			},
			filename: (req, file, cb) => {
				cb(null, Date.now() + '.jpg')
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

export default imageUploader
