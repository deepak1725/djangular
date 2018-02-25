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
            // console.log("State", state)
            // console.log("Action", action)
            // state.payload.find(findd => action.payload)
            return {
                type: action.type,
                payload: [ ...action.payload],
                error: false
            };

        case Constants.USEREDIT:
            let newisMessageArrived = true;

            if (action.payload.isCurrentChannel) {
                newisMessageArrived = false;
            }
            state.payload.map((element) => {

                if (action.payload.channel === element.channel) {
                    element.isNewMessageArrived = newisMessageArrived
                    return;
                }
            });
            return {
                type: action.type,
                payload: [...state.payload],
                error: false
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