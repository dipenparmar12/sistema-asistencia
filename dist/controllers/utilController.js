"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Teacher_1 = require("../entity/Teacher");
const fs = require("fs");
const csv = require("fast-csv");
const multer = require("multer");
////// Image Upload Method ( Student Registration POST METHOD )
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploads');
        },
        /// store file with jwt_token + orignal_name
        filename: (req, file, cb) => {
            let filename_without_ext = file.originalname.split('.')[0];
            // let file_extension = file_name_array[file_name_array.length - 1]
            cb(null, req.cookies.jwt + '_' + filename_without_ext + '.jpg');
        },
    }),
    /// Check File type must be png,jpg,jpeg only
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'), null);
        }
    },
}).array('profile_pic', 3);
exports.upload = upload;
const get_teacherEntity_fromObject = (teacherObject) => __awaiter(this, void 0, void 0, function* () {
    let teacher = new Teacher_1.default();
    teacher.username = teacherObject.username;
    teacher.password = teacherObject.password;
    teacher.name = teacherObject.name;
    teacher.subject = teacherObject.subject;
    teacher.email = teacherObject.email;
    teacher.mobile = teacherObject.mobile;
    teacher.address = teacherObject.address;
    teacher.roll = teacherObject.roll;
    return teacher;
});
exports.get_teacherEntity_fromObject = get_teacherEntity_fromObject;
const getCsvData = (csvFileName = 'teachers.csv') => {
    let csvFilePath = './src/fixtures/' + csvFileName;
    return new Promise((resolve, reject) => {
        let list = [];
        try {
            fs.createReadStream(csvFilePath)
                .pipe(csv.parse({ headers: true }))
                .on('data', teacher => {
                list.push(teacher);
            })
                .on('end', data => {
                resolve(list);
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.getCsvData = getCsvData;
//# sourceMappingURL=utilController.js.map