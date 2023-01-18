//handle permissions for each user
import jwt from 'jsonwebtoken';

const auth = async (req,res, next) => {
    try {
        //check if token is valid
        const token = req.headers.authorization.split(" ")[1];

        //if tokens length is > 500 its users otherwise its google auths
        const isCustomAuth = token.length < 500;

        //data we want from token
        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id; 
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch(error){
        console.log(error);
    }
}
export default auth;