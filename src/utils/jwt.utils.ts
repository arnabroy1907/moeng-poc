import CryptoJS from 'crypto-js';
import jwtDecode, { JwtHeader, JwtPayload } from 'jwt-decode';
import { AuthError, User } from '../types';

// JWT constants
const jwtSecretKey = 'MoengagePOCKey##6bccba5c-fc4e-48aa-97fb-24d9618434c9'
const jwtIss = 'moeng-poc';
const jwtAlgorithm = 'HS256';
const jwtId = '6bccba5c'

type JWTHeader =  JwtHeader &{
    kid: string;
};

type JWTUserPayload = JwtPayload & {
    sub: string;
    email: string;
};

const base64url = (source: CryptoJS.lib.WordArray): string => {
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(source);
  
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');
  
    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
  
    return encodedSource;
}

export const generateToken = async (userData: User, expiresInSecs: number): Promise<string> => {
    try {
        const tokenHeader: JWTHeader = {
            alg: jwtAlgorithm,
            kid: jwtId,
            type: 'JWT'
        };

        const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(tokenHeader));
        const encodedHeader = base64url(stringifiedHeader);

        const issueTime = Math.floor(new Date().getTime() / 1000);

        const payload: JWTUserPayload = {
            sub: userData.id,
            email: userData.email,
            iss: jwtIss,
            iat: issueTime,
            exp: issueTime + expiresInSecs
        };

        const stringifiedPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
        const encodedPayload = base64url(stringifiedPayload);

        let token = `${encodedHeader}.${encodedPayload}`;

        const signature = CryptoJS.HmacSHA256(token, jwtSecretKey);
        const encodedSignature = base64url(signature);

        token = `${token}.${encodedSignature}`;

        return token;
    }
    catch (err: any) {
        console.error(err);
        throw new AuthError('Failed to create token !', 401);
    }
};

const verifyToken = (tokenUserPayload: JWTUserPayload, tokenHeader: JWTHeader) => {
    if (tokenHeader.alg !== jwtAlgorithm)
        throw new Error('Invalid algorithm');
    if (tokenHeader.kid !== jwtId)
        throw new Error('Invalid token kid');

    if (tokenUserPayload.iss !== jwtIss)
        throw new Error('Invalid token issuer');

    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (tokenUserPayload.exp && tokenUserPayload.exp < currentTime)
        throw new Error('Expired token');

    if (!tokenUserPayload.sub || !tokenUserPayload.email)
        throw new Error('Invalid token payload');
};

export const verifyAndDecodeToken = async (token: string): Promise<JWTUserPayload> => {
    if (!token) throw new AuthError('Invalid Token!', 401);
    try {
        const decodedHeader = jwtDecode<JWTHeader>(token, { header: true });
        const decodedPayload = jwtDecode<JWTUserPayload>(token);

        verifyToken(decodedPayload, decodedHeader);

        return decodedPayload;
    } catch (err) {
        console.error(err);
        throw new AuthError('Invalid Token!', 401);
    }
}