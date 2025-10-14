import jwt from 'jsonwebtoken'

export const generateToken = (user)=>{
    jwt(user, process.env.SECRET_KEY, {expiresIn:'2h'});
}