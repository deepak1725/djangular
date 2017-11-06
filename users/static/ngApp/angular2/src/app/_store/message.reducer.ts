import { Constants } from './constants';


export interface IMessageState {
    id?: number;
    message?: string;
    channelId?: number;
}
export const INITIAL_STATE: IMessageState = {
    id: 0
}

export function messageReducer(state: IMessageState = INITIAL_STATE, action): IMessageState {

    switch (action.type) {

        case Constants.MESSAGELIST:
            return { channelId: state.channelId + 1 };
            
        case Constants.MESSAGEDETAILS:
            return { channelId: state.channelId + 1 };
        
        case Constants.MESSAGEADD:
            return { channelId: state.channelId + 1 };
        
        case Constants.MESSAGEEDIT:
            return { channelId: state.channelId + 1 };

        case Constants.MESSAGEREMOVE:
            return { channelId: state.channelId + 1 };

        
        default:
            return state;
    }
}