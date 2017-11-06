import {Constants} from './constants';

export interface IGroupState {
    id?: number;
    name?: string;
    groupId?: number;
    online?: number;
    user_id?: number;
}

export const INITIAL_STATE: IGroupState = {
    id: 0
}

export function groupReducer(state: IGroupState = INITIAL_STATE, action): IGroupState {

    switch (action.type) {

        case Constants.GROUPLIST:
            return { groupId: state.groupId + 1 };

        case Constants.GROUPDETAILS:
            return { groupId: state.groupId + 1 };

        case Constants.GROUPADD:
            return { groupId: state.groupId + 1 };

        case Constants.GROUPEDIT:
            return { groupId: state.groupId + 1 };

        case Constants.GROUPREMOVE:
            return { groupId: state.groupId + 1 };

        default:
            return state;
    }
}