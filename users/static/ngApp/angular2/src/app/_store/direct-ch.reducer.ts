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
            
            // if Channel Exist
            state.payload.map((element) => {
                if (element.channel == action.payload.channel){
                    return {
                        type: action.type,
                        payload: [...state.payload],
                        error: false
                    }
                } 
            })
            // if (state.payload.indexOf(action.payload) > -1) {
            //     return {
            //         type: action.type,
            //         payload: [...state.payload],
            //         error: false
            //     }
            // }

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