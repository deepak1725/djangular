import { Constants } from './constants';


export interface IChannelState {
    all?: any[];
}

export const INITIAL_STATE: IChannelState = {
    all: []
} 

export function channelReducer(state: IChannelState = INITIAL_STATE, action): IChannelState {
    
    switch (action.type) {

        case Constants.CHANNELLIST:
            return { all: state.all };

        case Constants.CHANNELDETAILS:
            
            return { all: state.all};

        case Constants.CHANNELADD:
            let lastId = 0

            if (state.all && state.all.length) {
                lastId = state.all.length
            }

            action.all[0] = {...action.all[0], ...{ id: lastId+1, history: [] } }

            return {all: [ ...state.all, ...action.all ] };

        case Constants.CHANNELEDIT:
            return { all: state.all};

        case Constants.CHANNELREMOVE:
            return { all: state.all };

        default:
            return state;
    }
}