import Teacher from '../entity/Teacher';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import multer = require('multer');
import { Request } from 'express';
import * as path from 'path';

////// Image Upload Method ( Student Registration POST METHOD )
const upload = multer({
  storage: multer.diskStorage({
    destination: (req: Request, file, cb) => {
      var dir = './public/uploads/' + req.body.enrollment_no;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },

    /// store file with jwt_token + orignal_name
    filename: (req: Request, file, cb) => {
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
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'), null);
    }
  }
}).array('profile_pic', 5);

const get_teacherEntity_fromObject = async teacherObject => {
  let teacher: Teacher = new Teacher();
  teacher.username = teacherObject.username;
  teacher.password = teacherObject.password;
  teacher.name = teacherObject.name;
  teacher.subject = teacherObject.subject;
  teacher.email = teacherObject.email;
  teacher.mobile = teacherObject.mobile;
  teacher.address = teacherObject.address;
  teacher.roll = teacherObject.roll;
  return teacher;
};

const getCsvData = (csvFileName: string = 'teachers.csv') => {
  let csvFilePath: string = './src/fixtures/' + csvFileName;
  return new Promise((resolve, reject) => {
    let list: any = [];
    try {
      fs.createReadStream(csvFilePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', teacher => {
          list.push(teacher);
        })
        .on('end', data => {
          resolve(list);
        });
    } catch (error) {
      reject(error);
    }
  });
};

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

const test = async dir => { };

export {
  upload,
  get_teacherEntity_fromObject,
  getCsvData,
  getFilesFromPath
};


