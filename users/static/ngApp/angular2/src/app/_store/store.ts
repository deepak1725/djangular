import { Action } from 'redux';
import { CounterActions } from '../_models/actions';




export interface ChatAppState {
    count : number;
}


export const INITIAL_STATE : ChatAppState = {
    count: 0
} 


export function rootReducer(state : ChatAppState, action) : ChatAppState {
    switch (action.type){
        case CounterActions.INCREMENT : return { count : state.count + 1};
        case CounterActions.DECREMENT : return { count : state.count - 1};
        default: return {count: state.count };
    }
}