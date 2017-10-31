import { Action } from 'redux';
import { AppActions } from '../_models/actions';




export interface ChatAppState {
    count : number;
}


export const INITIAL_STATE : ChatAppState = {
    count: 0
} 


export function rootReducer(state : ChatAppState, action) : ChatAppState {
    switch (action.type){
        
        case AppActions.INCREMENT :
            return { count : state.count + 1};

        case AppActions.DECREMENT : 
            return { count : state.count - 1};

        case AppActions.CHANNELLIST : 
            return { count : state.count - 1};
        
        default: 
            return {count: state.count };
    }
}