import { Constants } from './constants';


export interface IPrivateChannelState {
    type?: string;
    payload?: any[];
    error?: boolean;
}

export const INITIAL_STATE: IPrivateChannelState = {
    type: '',
    payload: [],
    error: false
} 

export function PrivateChannelReducer(state: IPrivateChannelState = INITIAL_STATE, action): IPrivateChannelState {
    
    switch (action.type) {

        case Constants.PRIVATECHANNELLIST:
            return { payload: state.payload };

        case Constants.PRIVATECHANNELDETAILS:

            return { payload: state.payload };

        case Constants.PRIVATECHANNELADD:
            //If Channel Exists
            if (state.payload.indexOf(action.payload) > -1) {
                return {
                    type: action.type,
                    payload: [...state.payload],
                    error: false
                }
            } 
            return {
                type: action.type,
                payload: [...state.payload, ...action.payload],
                error: false
            };

        case Constants.PRIVATECHANNELEDIT:
            console.log("Private CHanel edit payload", action.payload);
            let newisMessageArrived = true;

            if (action.payload.isCurrentChannel) {
                console.log("Channel is CUrrent");
                newisMessageArrived = false;
            }
            state.payload.map((element) => {
                console.log("Checkign channel");
                
                if (action.payload.channel === element.channel) {
                    console.log("Chenle found");
                    element.isNewMessageArrived = newisMessageArrived
                    return;
                }
            });
            return {
                type: action.type,
                payload: [...state.payload],
                error: false
            };


        default:
            return state;
    }
}