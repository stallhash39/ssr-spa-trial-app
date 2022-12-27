import { ActionTree, ActionContext, Payload } from 'vuex'

import { State, state } from './state';


import { ActionTypes } from './action-types';
import { Mutations } from './mutations'
import { MutationTypes } from './mutation-types';

import { get, post, put, patch, http_asp, DELETE, UploadFileHttp } from '../../utils/http';

import { userDetails, IdTitlePair, ideaInvite, Ownership, Royalty, ideaActivity, ideaNft} from './interfaces';
import { ideaNft as ideaNftDetails, ideaNftList, actionTypes, ideaNftActivity, activityList, ideaStates } from './mock/mockData';
import { userRoles } from './mock/mockData';

import { timestampLog as $timestampLog } from '../../utils/consolelog'


// Added Default Code from DAO Features - STARTS
type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
  } & Omit<ActionContext<State, State>, "commit">;


export interface Actions {

    [ActionTypes.GET_IDEA_USER_ROLES](
        { commit }: AugmentedActionContext,
        payload: any
    ): void;
}

// Added Default Code from DAO Features - ENDS HERE

let BASE_URL: string = 'http://hashremapi:8080/api'
let BASE_IMAGE_URL: string = "http://hashremapi:8080/"
let API_BASE_URL: string = "https://localhost:5001/api"
let MOCK_API_BASE_URL: string = API_BASE_URL

// Keep Data consistent betweeb modules
// Current Standard Repsonse from the server is as follows
// Header
// Body
    // Data - Custom Body type
// Refresh ( Based on last api call ? )
// On Modunt of componentn ( Make a new api call )



// action const
export const actions: ActionTree<State, State> & Actions = {

  // CONSTANTS
    async [ActionTypes.GET_IDEA_USER_ROLES]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_USER_ROLES, userRoles);
    },

    async [ActionTypes.GET_ACTION_TYPES]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_ACTION_TYPES, actionTypes);
    },
    
  // SIGN-IN & SIGN-UP
    async [ActionTypes.SIGNIN_USER]({ commit, dispatch }, payload: any) {

        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        // commit(MutationTypes.SET_ACTION_TYPES, actionTypes);

        console.log("440 - SignIn Action Called");

        try {
            const res: any = await post(`${BASE_URL}/auth/SignInSignUp/`, payload)
            if (res.status == 200) {
              commit(MutationTypes.SET_USER_INPUT_ERROR, false)
              commit(MutationTypes.SET_EMAIL, res.data['email'])
            }
            else if (res.status == 422) {
              commit(MutationTypes.SET_USER_INPUT_ERROR, true)
            }
            return res;
          } catch (e) {
            $timestampLog("Error Caught", e)
          }

    },

    async [ActionTypes.SIGNUP_USER]({ commit }, payload: any) {
        $timestampLog("action UserSignup called ", payload);
    
        const response = post(`${BASE_URL}/auth/SignInSignUp/`, payload)
          .then((res: any) => $timestampLog('UserSignUp ', res))
      },
    
    async [ActionTypes.VERIFY_USER]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        // commit(MutationTypes.SET_ACTION_TYPES, actionTypes);

        const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        if (res.status === 200) {
          $timestampLog("action UserOTPVerification payload", payload);
          commit(MutationTypes.SET_EMAIL, res.data['email'])
          commit(MutationTypes.SET_LOGGED_IN, true)
          commit(MutationTypes.SET_ACCESS_TOKEN, res.data['access_token'])
          commit(MutationTypes.SET_REFRESH_TOKEN, res.data['refresh_token'])
          commit(MutationTypes.SET_FIRST_NAME, res.data['first_name'])
          commit(MutationTypes.SET_LAST_NAME, res.data['last_name'])
          commit(MutationTypes.SET_AVATAR_URL, (`${BASE_IMAGE_URL}` + res.data['avatar_url']))
          dispatch('GetPurposeStatement') // TODO: Remove this after the avatar_url return value has been fixed
        }
        else if (res.status === 422 || res.status === 400) {
          commit(MutationTypes.SET_USER_INPUT_ERROR, true)
        }
        return res

    },


    async [ActionTypes.CHECK_RECOVERY_CODE]({ commit }, payload: any) {
    const res: any = await post(`${BASE_URL}/auth/check/recovery/code/`, payload)
    return res
    },
    
    async [ActionTypes.RE_SEND_CODE]({ commit }, payload: any) {
    const res: any = await post(`${BASE_URL}/auth/resend/otp/`, payload)
    if (res.status === 200) {
        commit(MutationTypes.SET_EMAIL, res.data['email'])
        commit(MutationTypes.SET_LOGGED_IN, true)
        commit(MutationTypes.SET_ACCESS_TOKEN, res.data['access_token'])
        commit(MutationTypes.SET_REFRESH_TOKEN, res.data['refresh_token'])
        commit(MutationTypes.SET_FIRST_NAME, res.data['first_name'])
        commit(MutationTypes.SET_LAST_NAME, res.data['last_name'])
        commit(MutationTypes.SET_AVATAR_URL, (`${BASE_IMAGE_URL}` + res.data['avatar_url']))
        $timestampLog("action ReSendCode payload", payload);
    }
    else if (res.status === 422 || res.status === 400) {
        commit(MutationTypes.SET_USER_INPUT_ERROR, true)
    }
    return res
    },


  // CRUD & EXPLORE - MARKETPLACE
    async [ActionTypes.CREATE_IDEA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_IDEA_NFT, ideaNftDetails[106]);
    },

    async [ActionTypes.READ_SINGLE_IDEA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_IDEA_NFT, ideaNftDetails[106] );
    },

    async [ActionTypes.READ_IDEA_NFT_LISTING]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_IDEA_NFT_LISTED, ideaNftList);
    },

    async [ActionTypes.UPDATE_IDEA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_IDEA_NFT, ideaNftDetails[106]);
    },

    async [ActionTypes.DELETE_IDEA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_IDEA_NFT, ideaNftDetails[106]);
    },


  // INVITATION
    async [ActionTypes.CREATE_INVITATION_TO_IDEA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_USER_ROLES, {});
    },

    async [ActionTypes.GET_INVITATIONS_FOR_IDEA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_INVITATIONS_IDEA_NFT, payload);
    },

    async [ActionTypes.DELETE_INVITATION_TO_IDEA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_INVITATIONS_IDEA_NFT, [] );
    },


  // ACTIVITY
    async [ActionTypes.GET_ACTIVITY_TYPES]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_ACTIVITY_TYPES, activityList);
    },

    async [ActionTypes.READ_ACTIVITY]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_ACTIVITY_IDEA_NFT, ideaNftActivity);
    },


  // OWNERSHIP - ROYALTY
    async [ActionTypes.ACCEPT_INVITATION_TO_IDEA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_USER_ROLES, {});
    },

    async [ActionTypes.UPDATE_OWNERSHIP_ROYALTY_TO_IDA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_OWNERSHIP_ROYALTY_FOR_IDEA_NFT, {});
    },

    async [ActionTypes.DELETE_OWNER_FROM_IDEA_NFT]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_OWNERSHIP_ROYALTY_FOR_IDEA_NFT, {});
    },


  // ONBOARDING
    async [ActionTypes.GET_LIST_OF_USE_ONBOARDING_TYPES]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_ONBOARDING_STATES, {});
    },

    async [ActionTypes.RECORD_USER_ONBOARDING]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)

        // LocalHost Committ
        commit(MutationTypes.SET_USER_ROLES, {});
    },

    async [ActionTypes.QUERY_USER_ONBOARDING]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)

        // LocalHost Update
        return false;
    },


  // IDEA STATES
    async [ActionTypes.GET_LIST_IDEA_STATES]({ commit, dispatch }, payload: IdTitlePair[]) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_IDEA_STATES, ideaStates);
    },


  // CONNET WALLET
    async [ActionTypes.RECORD_USERS_WALLET]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_USER_ROLES, {});
    },

  // ENCRYPTION
    async [ActionTypes.RECORD_ENCRYPTION_KEY]({ commit, dispatch }, payload: any) {
        // const res: any = await post(`${BASE_URL}/auth/verify/`, payload)
        commit(MutationTypes.SET_ENCRYPTION_KEY, payload);
    },


}
