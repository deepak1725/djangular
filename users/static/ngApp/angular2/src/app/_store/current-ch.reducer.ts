import { Constants } from './constants';


export interface ICurrentChannelState {
    type?: string;
    payload?: object;
    error?: boolean;
}

export const INITIAL_STATE: ICurrentChannelState = {
    type: '',
    payload: null,
    error: false
} 

export function CurrentChannelReducer(state: ICurrentChannelState = INITIAL_STATE, action): ICurrentChannelState {
    
    switch (action.type) {

        case Constants.CURRENTCHANNELLIST:
            return { payload: state.payload };

        case Constants.CURRENTCHANNELDETAILS:
            
            return { payload: state.payload};

        case Constants.CURRENTCHANNELADD:
            return {
                type: action.type,
                payload: {...state.payload, ...action.payload},
                error: false
            };
        
        case Constants.CURRENTCHANNELEDIT:
            return {
                type: action.type,
                payload: {...state.payload, ...action.payload},
                error: false
            };


        default:
            return state;
    }
}