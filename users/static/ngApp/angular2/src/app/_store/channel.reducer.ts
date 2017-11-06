import { Constants } from './constants';


export interface IChannelState {
    name?: string[];
}

export const INITIAL_STATE: IChannelState = {
    name: null
} 

export function channelReducer(state: IChannelState = INITIAL_STATE, action): IChannelState {
    
    switch (action.type) {

        case Constants.CHANNELLIST:
            return { name: state.name };

        case Constants.CHANNELDETAILS:
            return { name: state.name};

        case Constants.CHANNELADD:
            return { ...{name: state.name}, ...{name: action.name} };

        case Constants.CHANNELEDIT:
            return { name: state.name};

        case Constants.CHANNELREMOVE:
            return { name: state.name };

        default:
            return state;
    }
}