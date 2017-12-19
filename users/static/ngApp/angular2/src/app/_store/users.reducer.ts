import { Constants } from './constants';


export interface IUserState {
    id?: number;
    name?: string;
    groupId?: number;
    all?: object[];
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
            let lastId = 0
            console.log(action.all);
            for (const user in action.all) {
                console.log("for each", user);
                if (action.all.hasOwnProperty(user)) {
                    const element = action.all[user];
                }
            }
            // action.all.forEach(element => {
            //     lastId += 1;
            //     if (state.all && state.all.length) {
            //         lastId = state.all.length + 1
            //     }
            //     action.all = [{ ...element, ...{ id: lastId } }]
            //     state.all = [...state.all, ...action.all]
            // });

            return { all: state.all };


        case Constants.USEREDIT:
            return { groupId: state.groupId + 1 };

        case Constants.USERREMOVE:
            return { groupId: state.groupId + 1 };

        default:
            return state;
    }
}