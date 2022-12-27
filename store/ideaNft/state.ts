import { userDetails, IdTitlePair, ideaInvite, Ownership, Royalty, ideaActivity, ideaNft} from './interfaces';
// State
export type State = {
    ideaNft: ideaNft | undefined,
    pgNo: number,
    items: number,
    ideaNftList: ideaNft[],
    ideaActivity: ideaActivity[],
    onboarding: IdTitlePair[],
    userRoles: IdTitlePair[],
    activityTypes: IdTitlePair[],
    actionTypes: IdTitlePair[],
    ideaStates: IdTitlePair[],
    encryptionKey: string
};
// State - Default Values
export const state: State = {
    ideaNft: undefined,
    pgNo: 1,
    items: 20,
    ideaNftList: [],
    ideaActivity: [],
    onboarding: [],
    userRoles: [],
    activityTypes: [],
    actionTypes: [],
    ideaStates: [],
    encryptionKey: ""
};
