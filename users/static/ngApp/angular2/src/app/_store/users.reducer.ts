import { Constants } from './constants';


export interface IUserState {
    type: string;
    payload: any;
    error?: boolean;
}

export const INITIAL_STATE: IUserState = {
    type: null,
    payload: [],
    error: false
}

export function userReducer(state: IUserState = INITIAL_STATE, action): IUserState {


    switch (action.type) {

        case Constants.USERLIST:
            return {
                type: action.type, 
                payload: state.payload 
            };

        case Constants.USERDETAILS:
            return {
                type: action.type,
                payload: state.payload
            };

        case Constants.USERADD:
            let lastId = 0
    

            return {
                type: action.type,
                payload: [...state.payload, ...action.payload],
                error: false
            };

        case Constants.USEREDIT:
            return {
                type: action.type,
                payload: state.payload
            };

        case Constants.USERREMOVE:
            return {
                type: action.type,
                payload: state.payload
            };

        default:
            return state;
    }
}