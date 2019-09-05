import { getRepository } from 'typeorm';
import { Request, Response } from 'express-serve-static-core';
import * as jwt from 'jsonwebtoken';
import Teacher from '../entity/Teacher';
import { NextFunction } from 'connect';

class AuthController {
  constructor() {}

  loginView = (req: Request, res: Response) => {
    res.render('teacher_login');
  };

  loginAuth = async (req: Request, res: Response, next: NextFunction) => {
    console.log('LoginAuth 1');
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      console.log('Username, Password not Available');
      res.status(400).send('');
      // return;
    }
    console.log('LoginAuth 2');

    const teacherRepository = getRepository(Teacher);
    let teacher: Teacher;

    //Get teacher from database
    try {
      teacher = await teacherRepository.findOneOrFail({ where: { username } });
      //Check if encrypted password match
      if (!teacher.unencrypted_password_is_valid(password)) {
        res.status(401).render('teacher_login', {
          error: 'Username, password not existed'
        });
        return;
      }

      //Sing JWT, valid for 1 hour
      const jwtToken = jwt.sign(
        { id: teacher.id, username: teacher.username, roll: teacher.roll },
        process.env.JWT_TOKEN,
        { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR }
      );

      // res.setHeader('jwt', jwtToken)

      /// Creating Cookie for Auth
      res.cookie('jwt', jwtToken, {
        expires: new Date(Date.now() + process.env.JWT_TOKEN),
        // secure:true,
        httpOnly: true
      });

      //Send the jwt in the response
      // res.send(teacher)
      res.redirect('/index');
    } catch (error) {
      console.log('LoginAuth Catch (Error)');
      res.status(401).render('teacher_login', {
        error: 'Username, password not existed'
      });
      // res.status(401).render('errors/404');
    }

    // res.status(401).render('teacher_login', {
    //   error: 'Username, password not existed'
    // });
  };

  logout = (req: Request, res: Response) => {
    res.clearCookie('jwt');
    res.clearCookie('user');
    res.render('teacher_login');
  };

  getRoll = (req: Request, res: Response) => {};
}

export default new AuthController();
