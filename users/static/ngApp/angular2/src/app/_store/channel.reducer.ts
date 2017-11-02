import { Constants } from './constants';


export interface IChannelState {
    id?: number;
    name?: string;
    groupId?: number;
    online?: number;
    userId?:number;
}

export const INITIAL_STATE: IChannelState = {
    id: 0
} 

export function channelReducer(state: IChannelState = INITIAL_STATE, action): IChannelState {
    
    switch (action.type) {

        case Constants.CHANNELLIST:
            return { groupId: state.groupId + 1 };

        case Constants.CHANNELDETAILS:
            return { groupId: state.groupId + 1 };

        case Constants.CHANNELADD:
            return { groupId: state.groupId + 1 };

        case Constants.CHANNELEDIT:
            return { groupId: state.groupId + 1 };

        case Constants.CHANNELREMOVE:
            return { groupId: state.groupId + 1 };

        default:
            return;
    }
}