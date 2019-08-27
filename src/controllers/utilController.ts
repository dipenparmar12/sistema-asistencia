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

export { upload }
