import { User } from "../types";

// @ts-ignore
export const Moengage: any = window.Moengage;

export const loginMoengageSession = async (user: User): Promise<boolean> => {
    return new Promise<boolean>(async (resolve) => {
        console.log('loginMoengageSession called');
        try {
            if (!Moengage) throw new Error('Moengage not found!');

            await Moengage.add_unique_user_id(user.id);
            await Moengage.add_email(user.email);
            await Moengage.add_user_name(user.email);
            await Moengage.add_first_name(user.firstName);
            await Moengage.add_last_name(user.lastName);
            await Moengage.add_mobile(user.phone);
            await Moengage.add_user_attribute('user-type', user.userType);

            console.log('loginMoengageSession done');
            resolve(true);
        } catch (err) {
            console.error('loginMoengageSession Error', err);
            resolve(false);
        }
    });
};

export const logoutMoengageSession = async () => {
    return new Promise<boolean>(async (resolve) => {
        try {
            console.log('destroy_session called');
            await Moengage.destroy_session();
            resolve(true);
        } catch (err) {
            console.error('logoutMoengageSession Error', err);
            resolve(false);
        }
    });
}