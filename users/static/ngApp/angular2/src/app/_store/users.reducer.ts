import { Constants } from './constants';


export interface IUserState {
    id?: number;
    name?: string;
    groupId?: number;
}

export const INITIAL_STATE: IUserState = {
    id: 0
}

export function userReducer(state: IUserState = INITIAL_STATE, action): IUserState {


    switch (action.type) {

        case Constants.USERLIST:
            return { groupId: state.groupId + 1 };

        case Constants.USERDETAILS:
            return { groupId: state.groupId + 1 };

        case Constants.USERADD:
            return { groupId: state.groupId + 1 };

        case Constants.USEREDIT:
            return { groupId: state.groupId + 1 };

        case Constants.USERREMOVE:
            return { groupId: state.groupId + 1 };

        default:
            return;
    }
}