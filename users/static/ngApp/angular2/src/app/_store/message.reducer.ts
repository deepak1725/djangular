import { Constants } from './constants';


export interface IMessageState {
    type:string,
    payload: Array<object>,
    error:boolean
    // message?: string;
    // channelId?: number;
}
export const INITIAL_STATE: IMessageState = {
    type: null,
    payload: [],
    error: false
}

export function messageReducer(state: IMessageState = INITIAL_STATE, action): IMessageState {

    switch (action.type) {

        case Constants.MESSAGELIST:
            return { 
                type: action.type,
                payload:[],
                error: false
            };
            
        case Constants.MESSAGEDETAILS:
            return {
                type: action.type,
                payload: [],
                error: false
            };

        
        case Constants.MESSAGEADD:
            let emptyArray = [];
            let id = state.payload.length + 1
            let object = {
                id : id,
                edited: action.newData.edited,
                data: action.newData.data,
                channel: action.newData.channel
            }
            emptyArray.push(object);
            state.payload = [ ...state.payload, ...emptyArray ]

            return {
                type: action.type,
                payload: state.payload,
                error: false
            };

        
        case Constants.MESSAGEEDIT:
            return {
                type: action.type,
                payload: [],
                error: false
            };


        case Constants.MESSAGEREMOVE:
            return {
                type: action.type,
                payload: [],
                error: false
            };


        
        default:
            return state;
    }
}