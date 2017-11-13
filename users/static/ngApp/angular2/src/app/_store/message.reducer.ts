import { Constants } from './constants';


export interface IMessageState {
    all?: object[];
    // message?: string;
    // channelId?: number;
}
export const INITIAL_STATE: IMessageState = {
    all: []
}

export function messageReducer(state: IMessageState = INITIAL_STATE, action): IMessageState {

    switch (action.type) {

        case Constants.MESSAGELIST:
            return { all: state.all };
            
        case Constants.MESSAGEDETAILS:
            return { all: state.all };
        
        case Constants.MESSAGEADD:
            let lastId = 0
            
            action.all.forEach(element => { 
                lastId +=1;
                if (state.all && state.all.length) {
                    lastId = state.all.length + 1
                }
                action.all = [{ ...element, ...{ id: lastId} }]
                state.all = [ ...state.all, ...action.all ]
            });

            return { all: state.all };
        
        case Constants.MESSAGEEDIT:
            return { all: state.all };

        case Constants.MESSAGEREMOVE:
            return { all: []};

        
        default:
            return state;
    }
}