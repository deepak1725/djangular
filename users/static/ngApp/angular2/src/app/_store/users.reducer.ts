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
            action.payload.map((user) => {
                user['isNewMessageArrived'] = false
            })
            return {
                type: action.type,
                payload: [ ...action.payload],
                error: false
            };

        case Constants.USEREDIT:
          
            state.payload.map((element) => {
                
                if (action.payload.clearState) {                    
                    element.state = {}
                }

                if (action.payload.state) {
                
                    if (action.payload.channel === element.username) {
                        element.state = action.payload.state
                    }
                }
                else if (action.payload.channel === element.channel) {
                    element.isNewMessageArrived = action.payload.isNewMessageArrived
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