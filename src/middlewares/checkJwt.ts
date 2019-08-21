import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	//Get the jwt token from the head
	const token = <string>req.headers['auth']
	let jwtPayload

	//Try to validate the token and get data
	try {
		jwtPayload = <any>jwt.verify(token, process.env.JWT_TOKEN)
		res.locals.jwtPayload = jwtPayload
	} catch (error) {
		//If token is not valid, respond with 401 (unauthorized)
		res.status(401).send()
		return
	}

	//The token is valid for 1 hour
	//We want to send a new token on every request
	const { id, teacher, roll } = jwtPayload
	//Sing JWT, valid for 1 hour
	const jwtToken = jwt.sign({ id: teacher.id, username: teacher.username, roll: teacher.roll }, process.env.JWT_TOKEN, {
		expiresIn: '1h',
	})

	res.setHeader('jwt', jwtToken)

	//Call the next middleware or controller
	next()
}
