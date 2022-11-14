import { User } from "../types";

// @ts-ignore
export const Moengage: any = window.Moengage;

export const loginMoengageSession = (user: User): void => {
    try {
        if (!Moengage) throw new Error('Moengage not found!');

        Moengage.add_unique_user_id(user.id);
        Moengage.add_email(user.email);
        Moengage.add_user_name(user.email);
        Moengage.add_first_name(user.firstName);
        Moengage.add_last_name(user.lastName);
        Moengage.add_mobile(user.phone);
        Moengage.add_user_attribute('user-type', user.userType);

        console.log('loginMoengageSession done');
    } catch (err) {
        console.error('loginMoengageSession Error', err);
    }
};

export const logoutMoengageSession = () => {
    try {
        console.log('destroy_session called');
        Moengage.destroy_session();
    } catch (err) {
        console.error('logoutMoengageSession Error', err);
    }
}