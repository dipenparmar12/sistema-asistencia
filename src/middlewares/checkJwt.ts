import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
	//Get the jwt token from the head
	// const token = <string>req.headers['auth']
	let jwtCookieToken = req.cookies.jwt
	let jwtPayload
	// console.log(jwtCookieToken)

	//Try to validate the token and get data
	try {
		jwtPayload = await (<any>jwt.verify(jwtCookieToken, process.env.JWT_TOKEN))
		res.locals.jwtPayload = jwtPayload
	} catch (err) {
		// If token is not valid, respond with 401 (unauthorized)
		// Throw an error just in case anything goes wrong with verification
		res.status(401).render('teacher_login', { error: '401 (unauthorized), Please login first' })
		throw new Error(err)
		return
	}

	// The token is valid for 1 hour
	// We want to send a new token on every request
	const { id, username, roll } = jwtPayload
	//Sing JWT, valid for 1 hour
	const jwtToken = jwt.sign({ id, username, roll }, process.env.JWT_TOKEN, {
		expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR,
	})

	// // res.setHeader('jwt', jwtToken)

	/// Storing Cookie in Client machine for Auth
	res.cookie('jwt', jwtToken, {
		expires: new Date(Date.now() + process.env.JWT_TOKEN),
		// secure:true,
		httpOnly: true,
	})

	//Call the next middleware or controller
	next()
}

export const isLogged = async (req: Request, res: Response, next: NextFunction) => {
	//Get the jwt token from the head
	// const token = <string>req.headers['auth']
	let jwtCookieToken = req.cookies.jwt
	let jwtPayload
	// console.log(jwtCookieToken)

	//Try to validate the token and get data
	try {
		jwtPayload = await (<any>jwt.verify(jwtCookieToken, process.env.JWT_TOKEN))
		res.locals.jwtPayload = jwtPayload
	} catch (err) {
		// If token is not valid, respond with 401 (unauthorized)
		// Throw an error just in case anything goes wrong with verification
		res.status(401).render('teacher_login', { error: '401 (unauthorized), Please login first' })
		throw new Error(err)
		return
	}

	// The token is valid for 1 hour
	// We want to send a new token on every request
	const { id, username, roll } = jwtPayload
	//Sing JWT, valid for 1 hour
	const jwtToken = await jwt.sign({ id, username, roll }, process.env.JWT_TOKEN, {
		expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR,
	})

	// // res.setHeader('jwt', jwtToken)

	/// Storing Cookie in Client machine for Auth
	res.cookie('jwt', jwtToken, {
		expires: new Date(Date.now() + process.env.JWT_TOKEN),
		// secure:true,
		httpOnly: true,
	})

	res.redirect('index')
}
