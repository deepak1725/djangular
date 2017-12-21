import { Action, combineReducers } from 'redux';
import { Constants } from './constants';
import { groupReducer } from './group.reducer';
import { userReducer } from './users.reducer';
import * as PublicChannel from './public-ch.reducer';
import * as PrivateChannel from './private-ch.reducer';
import * as DirectChannel from './direct-ch.reducer';
import * as group from './group.reducer';
import * as users from './users.reducer';
import * as messages from './message.reducer';



export interface IAppState {
    public_channel?: PublicChannel.IPublicChannelState ;
    private_channel?: PrivateChannel.IPrivateChannelState ;
    direct_channel?: DirectChannel.IDirectChannelState ;
    group?: group.IGroupState;
    users?: users.IUserState;
    message?: messages.IMessageState;
}




export const rootReducer = combineReducers<IAppState>({
    public_channel: PublicChannel.PublicChannelReducer, 
    private_channel: PrivateChannel.PrivateChannelReducer,
    direct_channel: DirectChannel.DirectChannelReducer,
    group: group.groupReducer,
    users: users.userReducer,
    message: messages.messageReducer
});