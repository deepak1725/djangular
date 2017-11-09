import { Constants } from './constants';


export interface IChannelState {
    name?: string[];
}

export const INITIAL_STATE: IChannelState = {
    name: []
} 

export function channelReducer(state: IChannelState = INITIAL_STATE, action): IChannelState {
    
    switch (action.type) {

        case Constants.CHANNELLIST:
            return { name: state.name };

        case Constants.CHANNELDETAILS:
            return { name: state.name};

        case Constants.CHANNELADD:
            let lastId = 0

            if (state.name && state.name.length) {
                lastId = state.name.length
            }

            action.name[0] = {...action.name[0], ...{ id: lastId+1 } }

            return {name: [ ...state.name, ...action.name ] };

        case Constants.CHANNELEDIT:
            return { name: state.name};

        case Constants.CHANNELREMOVE:
            return { name: state.name };

        default:
            return state;
    }
}