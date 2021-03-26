"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesFromPath = exports.getCsvData = exports.get_teacherEntity_fromObject = exports.upload = void 0;
const Teacher_1 = require("../entity/Teacher");
const fs = require("fs");
const csv = require("fast-csv");
const multer = require("multer");
const path = require("path");
////// Image Upload Method ( Student Registration POST METHOD )
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            var dir = './public/uploads/' + req.body.enrollment_no;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
        },
        /// store file with jwt_token + orignal_name
        filename: (req, file, cb) => {
            cb(null, '1.jpg');
            // if (fs.existsSync(req.body.enrollment_no + '/1.jpg')) {
            //   cb(null, '2.jpg');
            // } else {
            //   cb(null, '1.jpg');
            // }
            // let filename_without_ext = file.originalname.split('.')[0];
            // // let file_extension = file_name_array[file_name_array.length - 1]
            // cb(null, req.cookies.jwt + '_' + filename_without_ext + '.jpg');
        }
    }),
    /// Check File type must be png,jpg,jpeg only
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg') {
            cb(null, true);
        }
        else {
            cb(null, false);
            // return cb(new Error('Only .png, .jpg and .jpeg format allowed!'), null);
            console.log("utileCOntoller.ts error");
            return;
        }
    }
}).array('profile_pic', 5);
exports.upload = upload;
const get_teacherEntity_fromObject = (teacherObject) => __awaiter(void 0, void 0, void 0, function* () {
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
const getFilesFromPath = uploadDir => {
    return fs
        .readdirSync(uploadDir)
        .filter(file => fs.lstatSync(path.join(uploadDir, file)).isFile());
    // fs.readdir(uploadDir, (e, files) => {
    //   if (e) return;
    //   for (let i = 0; i < files.length; i++) {
    //     if (!fs.lstatSync(uploadDir + files[i]).isDirectory()) {
    //       console.log(files[i]);
    //     }
    //   }
    // });
};
exports.getFilesFromPath = getFilesFromPath;
const test = (dir) => __awaiter(void 0, void 0, void 0, function* () { });
//# sourceMappingURL=utilController.js.map