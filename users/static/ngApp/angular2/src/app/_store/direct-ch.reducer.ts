import { Constants } from './constants';


export interface IDirectChannelState {
    type?: string;
    payload?: any[];
    error?: boolean;
}

export const INITIAL_STATE: IDirectChannelState = {
    type: '',
    payload: [],
    error: false
} 

export function DirectChannelReducer(state: IDirectChannelState = INITIAL_STATE, action): IDirectChannelState {
    
    switch (action.type) {

        case Constants.DIRECTCHANNELLIST:
            return { payload: state.payload };

        case Constants.DIRECTCHANNELDETAILS:
            
            return { payload: state.payload};

        case Constants.DIRECTCHANNELADD:
            return {
                type: action.type,
                payload: [...state.payload, ...action.payload],
                error: false
            };
        
        case Constants.DIRECTCHANNELEDIT:
            return {
                type: action.type,
                payload: [...state.payload, ...action.payload],
                error: false
            };


        default:
            return state;
    }
}