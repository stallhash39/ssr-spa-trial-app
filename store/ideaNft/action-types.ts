export enum ActionTypes {
    STORE_USERID = "STORE_USERID",

    // SignIn - SignUp
    SIGNIN_USER = "SIGNIN_USER",
    SIGNUP_USER = "SIGNUP_USER",
    VERIFY_USER = "VERIFY_USER",
    CHECK_RECOVERY_CODE = "CheckRecoveryCode",
    RE_SEND_CODE = "RE_SEND_CODE",

    // Constants
    GET_IDEA_USER_ROLES = "GET_IDEA_USER_ROLES",
    GET_ACTION_TYPES = "GET_ACTION_TYPES",

    // CRUD IDEA NFT & EXPLORE - MARKETPLACE
    CREATE_IDEA_NFT = "CREATE_IDEA_NFT",
    READ_SINGLE_IDEA_NFT = "READ_SINGLE_IDEA_NFT",
    READ_IDEA_NFT_LISTING = "READ_IDEA_NFT_LISTING",
    UPDATE_IDEA_NFT = "UPDATE_IDEA_NFT",
    DELETE_IDEA_NFT = "DELETE_IDEA_NFT",

    // INVITATION
    CREATE_INVITATION_TO_IDEA_NFT = "CREATE_INVITATION_TO_IDEA_NFT",
    GET_INVITATIONS_FOR_IDEA_NFT = "GET_INVITATIONS_FOR_IDEA_NFT",
    DELETE_INVITATION_TO_IDEA_NFT = "DELETE_INVITATION_TO_IDEA_NFT",
    
    // ACTIVITY
    GET_ACTIVITY_TYPES = "GET_ACTIVITY_TYPES",
    READ_ACTIVITY = "READ_ACTIVITY",

    // OWNERSHIP - ROYALTY UPDATE
    ACCEPT_INVITATION_TO_IDEA_NFT = "ACCEPT_INVITATION_TO_IDEA_NFT",
    UPDATE_OWNERSHIP_ROYALTY_TO_IDA_NFT = "UPDATE_OWNERSHIP_ROYALTY_TO_IDA_NFT",
    DELETE_OWNER_FROM_IDEA_NFT = "DELETE_OWNER_FROM_IDEA_NFT",

    // ONBOARDING
    RECORD_USER_ONBOARDING = "RECORD_USER_ONBOARDING",
    GET_LIST_OF_USE_ONBOARDING_TYPES = "GET_LIST_OF_USE_ONBOARDING_TYPES",
    QUERY_USER_ONBOARDING = "QUERY_USER_ONBOARDING",

    // IDEA STATES
    GET_LIST_IDEA_STATES = "GET_LIST_IDEA_STATES",

    // CONNECT WALLET
    RECORD_USERS_WALLET = "RECORD_USERS_WALLET",

    // ENCRYPTION
    RECORD_ENCRYPTION_KEY = "RECORD_ENCRYPTION_KEY",

}