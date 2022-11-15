import { v5 as uuidV5 } from 'uuid';
import { User, AuthError } from '../types';
import { generateToken, verifyAndDecodeToken } from './jwt.utils';
import { loginMoengageSession, logoutMoengageSession } from './moeng.utils';

const tokenExpiration = 12 * 60 * 60;

const authTokenKeyName = 'moeng_poc_access_token';
const userKeyName = 'moeng_poc_user_data';

const validEmailContent = 'moengpoc';
const validPasswordSet = ['MoengPoc#1022'];
const uuidNameSpace = '48a19d59-fa0b-47af-b8cc-1185ccdcf639';

const dummyFirstNamePrefix = 'User';
const dummyLasttName = 'POCMoengage';
const dummyPhoneNumber = '+91-9876543210';
const dummyUserType = 'moeng-poc';

const createDummyUser = (email: string, id?: string): User => {
    if (!id) id = uuidV5(email, uuidNameSpace);

    const nameSuffix = id.split('-')[0];

    const user: User = {
        id: id,
        email: email,
        firstName: dummyFirstNamePrefix.concat(nameSuffix),
        lastName: dummyLasttName,
        phone: dummyPhoneNumber,
        userType: dummyUserType
    };

    return user;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
    if (!email.includes(validEmailContent) || !validPasswordSet.includes(password)) {
        throw new AuthError('Incorrect email or password !', 401);
    }

    const user = createDummyUser(email);
    window.localStorage.setItem(userKeyName, JSON.stringify(user));
    loginMoengageSession(user);

    const accessToken = await generateToken(user, tokenExpiration);
    
    window.localStorage.setItem(authTokenKeyName, accessToken);
    return user;
}

export const authorize = async (): Promise<User> => {
    const accessToken = window.localStorage.getItem(authTokenKeyName);
    if (!accessToken) {
        throw new AuthError('User is not authenticated !', 401);
    }

    try {
        const tokenData = await verifyAndDecodeToken(accessToken);

        const id: string = tokenData.sub;
        const email: string = tokenData.email;

        const user = createDummyUser(email, id);

        loginMoengageSession(user);

        return user;
    } catch (err) {
        console.error(err);
        throw new AuthError('Invalid token !', 401);
    }
};

export const logout = async (): Promise<void> => {
    window.localStorage.clear();
    logoutMoengageSession();
}