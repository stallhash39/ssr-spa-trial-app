import { State } from './state';
import { GetterTree } from 'vuex';
import { userDetails, IdTitlePair, ideaInvite, Ownership, Royalty, ideaActivity, ideaNft } from './interfaces';

// Getters types
export type Getters = {
  ideaNft(state: State): ideaNft | undefined;
  ideaNftList(state: State): ideaNft[];
  ideaActivity(state: State): ideaActivity[];
  onboarding(state: State): IdTitlePair[];
  userRoles(state: State): IdTitlePair[];
  activityTypes(state: State): IdTitlePair[];
  actionTypes(state: State): IdTitlePair[];
  ideaStates(state: State): IdTitlePair[];
  encryptionKey(state: State): string;
};

export const getters: GetterTree<State, State> & Getters = {

  ideaNft: thisstate => {
      return thisstate.ideaNft;
    },

  ideaNftList: thisstate => {
    return thisstate.ideaNftList;
  },

  ideaActivity: thisstate => {
    return thisstate.ideaActivity;
  },

  onboarding: thisstate => {
    return thisstate.onboarding;
  },

  userRoles: thisstate => {
    return thisstate.userRoles;
  },

  activityTypes: thisstate => {
    return thisstate.activityTypes;
  },

  actionTypes: thisstate => {
    return thisstate.activityTypes;
  },

  ideaStates: thisstate => {
    return thisstate.ideaStates;
  },

  encryptionKey: thisstate => {
    return thisstate.encryptionKey;
  },

};
