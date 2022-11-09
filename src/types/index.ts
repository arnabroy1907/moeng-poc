export class AuthError extends Error {
    code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

export type User = {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    userType: string;
};

export type PushData = {
  payload: {
    urlToOpen: string;
    icon: string;
    image: string;
    title: string;
    message: string;
    moe_cid_attr: {
      [key: string]: string;
    }
  }
}

export type PushMessageType = {
  name: string;
  data: PushData;
};

export interface PushMessageEventType extends MessageEvent {
  data: PushMessageType
}