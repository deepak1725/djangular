import { element } from 'protractor';
import { Constants } from './constants';


export interface IPublicChannelState {
    type?: string;
    payload?: any[];
    error?: boolean;
}

export const INITIAL_STATE: IPublicChannelState = {
    type: '',
    payload: [],
    error: false
} 

export function PublicChannelReducer(state: IPublicChannelState = INITIAL_STATE, action): IPublicChannelState {
    
    switch (action.type) {

        case Constants.PUBLICCHANNELLIST:
            return { payload: state.payload };

        case Constants.PUBLICCHANNELDETAILS:

            return { payload: state.payload };

        case Constants.PUBLICCHANNELADD:
            return {
                type: action.type,
                payload: [...action.payload],
                error: false
            };

        case Constants.PUBLICCHANNELEDIT:
            let newisMessageArrived = true;

            if (action.payload.isCurrentChannel) {
                newisMessageArrived = false;
            }
            state.payload.map((element) => {
                if (action.payload.channel === element.channel) {
                    element.isNewMessageArrived = newisMessageArrived
                    return ;
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