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
            return {
                type: action.type,
                payload: [...state.payload, ...action.payload],
                error: false
            };

        case Constants.PRIVATECHANNELEDIT:
            return {
                type: action.type,
                payload: [...state.payload, ...action.payload],
                error: false
            };


        default:
            return state;
    }
}