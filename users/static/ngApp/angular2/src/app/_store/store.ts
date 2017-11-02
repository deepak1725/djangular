import { Action, combineReducers } from 'redux';
import { Constants } from './constants';
import { channelReducer } from './channel.reducer';
import { groupReducer } from './group.reducer';
import { userReducer } from './users.reducer';
import * as channel from './channel.reducer';
import * as group from './group.reducer';
import * as users from './users.reducer';
import * as messages from './message.reducer';



export interface IAppState {
    channel?: channel.IChannelState ;
    group?: group.IGroupState;
    users?: users.IUserState;
    message?: messages.IMessageState;
}




export const rootReducer = combineReducers<IAppState>({
    channel: channel.channelReducer,
    group: group.groupReducer,
    users: users.userReducer,
    message: messages.messageReducer
});



// export function rootReducer(state : ChatAppState, action) : ChatAppState {
//     switch (action.type){
        
//         case Constants.INCREMENT :
//             return { count : state.count + 1};

//         case Constants.CHANNELLIST : 
//             return { count : state.count - 1};
        
//         default: 
//             return {count: state.count };
//     }
// }