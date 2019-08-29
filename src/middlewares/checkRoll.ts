import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

/////  if 3rd param is 'redirect' & if jwt cookie token is valid then just redirected to home page
export const isPrinciple = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let jwtCookieToken = req.cookies.jwt
		let decoded_jwtCookieToken: any = await jwt.decode(jwtCookieToken)
		if (decoded_jwtCookieToken.roll == 'principle') {
			next()
		} else {
			res.redirect('/login')
		}
	} catch (error) {
		res.status(401).render('errors/404')
		return false
	}
}
