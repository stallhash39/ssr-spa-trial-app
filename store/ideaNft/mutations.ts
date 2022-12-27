import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { State } from './state'

import { userDetails, IdTitlePair, ideaInvite, Ownership, Royalty, ideaActivity, ideaNft} from './interfaces';

// Mutation Types
export type Mutations<S = State> = {
    
    [MutationTypes.SET_USER_ROLES](state: S, payload: IdTitlePair[]): void;
    [MutationTypes.SET_IDEA_NFT](state: S, payload: ideaNft): void;
    [MutationTypes.SET_OWNERSHIP_ROYALTY_FOR_IDEA_NFT](state: S, payload: Ownership[]): void;
    [MutationTypes.SET_INVITATIONS_IDEA_NFT](state: S, payload: ideaInvite[]): void;
    [MutationTypes.SET_IDEA_NFT_LISTED](state: S, payload: ideaNft[]): void;
    [MutationTypes.SET_ONBOARDING_STATES](state: S, payload: IdTitlePair[]): void;
    [MutationTypes.SET_ACTION_TYPES](state: S, payload: IdTitlePair[]): void;
    [MutationTypes.SET_ACTIVITY_TYPES](state: S, payload: IdTitlePair[]): void;
    [MutationTypes.SET_ENCRYPTION_KEY](state: S, payload: string): void;

};


// Define Mutations
export const mutations: MutationTree<State> & Mutations = {


    // LOCAL STORAGE
    [MutationTypes.GET_ACCESS_TOKEN](thisstate: State) {
      return localStorage.acess_token;
    },

    [MutationTypes.SET_ACCESS_TOKEN](thisstate: State, payload: string) {
      localStorage.acess_token = payload;
    },

    [MutationTypes.SET_REFRESH_TOKEN](thisstate: State, payload: string) {
      localStorage.refresh_token = payload;
    },


    [MutationTypes.SET_FIRST_NAME](thisstate: State, payload: string) {
      localStorage.first_name = payload;
    },


    [MutationTypes.SET_LAST_NAME](thisstate: State, payload: string) {
      localStorage.last_name = payload;
    },

    [MutationTypes.SET_AVATAR_URL](thisstate: State, payload: string) {
      localStorage.avatar_url = payload;
    },

    // IDEA NFT ASPECT
    [MutationTypes.SET_USER_ROLES](thisstate: State, payload: IdTitlePair[]) {
      thisstate.userRoles = payload;
    },
    [MutationTypes.SET_IDEA_NFT](thisstate: State, payload: ideaNft) {
      thisstate.ideaNft = payload;
    },
    [MutationTypes.SET_OWNERSHIP_ROYALTY_FOR_IDEA_NFT](thisstate: State, payload: Ownership[]) {
      if (thisstate.ideaNft !== undefined && thisstate.ideaNft.ownership !== undefined) {
        thisstate.ideaNft.ownership = payload;
      }
    },
    [MutationTypes.SET_INVITATIONS_IDEA_NFT](thisstate: State, payload: ideaInvite[] ) {
      if (thisstate.ideaNft !== undefined && thisstate.ideaNft.invitations !== undefined) {
        thisstate.ideaNft.invitations = payload;
      }
    },
    [MutationTypes.SET_ACTIVITY_IDEA_NFT](thisstate: State, payload: ideaActivity[] ) {
      thisstate.ideaActivity = payload;
    },
    [MutationTypes.SET_IDEA_NFT_LISTED](thisstate: State, payload: ideaNft[]) {
      thisstate.ideaNftList = payload;
    },
    [MutationTypes.SET_ONBOARDING_STATES](thisstate: State, payload: IdTitlePair[]) {
      thisstate.onboarding = payload;
    },
    [MutationTypes.SET_ACTION_TYPES](thisstate: State, payload: IdTitlePair[]) {
      thisstate.actionTypes = payload;
    },
    [MutationTypes.SET_ACTIVITY_TYPES](thisstate: State, payload: IdTitlePair[]) {
      thisstate.activityTypes = payload;
    },
    [MutationTypes.SET_IDEA_STATES](thisstate: State, payload: []) {
      thisstate.ideaStates = payload;
    },
    [MutationTypes.SET_ENCRYPTION_KEY](thisstate: State, payload: string) {
      thisstate.encryptionKey = payload;
    }
}
