export const userDetails = {
    1:{
        first_name: "First Name",
        last_name: "Last Name",
        profile_pic: ""
    },
    2:{
        first_name: "Al",
        last_name: "Rashid",
        profile_pic: ""
    },
    3:{
        first_name:  "John",
        last_name: "Doe",
        profile_pic: ""
    },
    4:{
        first_name: "Ramesh",
        last_name: "KaSuresh",
        profile_pic: ""
    },
}

export const userRoles = [
      {
        id: 1,
        title: 'Admin / Creator',
      },
      {
        id: 2,
        title: 'Owner',
      },
      {
        id: 3,
        title: 'Anonymous',
      }
    ];

// States of the idea
export const ideaStates = [
    {
        id: 1,
        title: 'Draft',
        color_code: "#fff"
    },
    {
        id: 2,
        title: 'Waiting to be acceped',
        color_code: "#fff"
    },
    {
        id: 3,
        title: 'Minting',
        color_code: "#fff"
    },
];


// Idea Visibilities
export const ideaVisibility = [
    {
        id: 1,
        title: 'Commercial'
    },
    {
        id: 2,
        title: 'Creative Commons'
    },
];


// Read Data for single Idea's
export const ideaNft = {
    101: {
        id: 101,
        state: 1,
        title: "NFT with state 1 - Draft & Public",
        public_description: null,
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 2,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [
            {
                "user_id": 1, "first_name":"Hello",
                "last_name":"World", "profile_pic":"",
                "role": 1,
                "percentage":49.9,
                "wallet_connected": true
            }
        ],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    },

    102: {
        id: 102,
        state: 1,
        title: "NFT with state 1 - Draft & Private",
        public_description: null,
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 1,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [{
            "user_id": 1, "first_name":"Hello",
            "role": 1,
            "last_name":"World", "profile_pic":"",
            "percentage":49.9, "wallet_connected": false}],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    },

    103: {
        id: 103,
        state: 3,
        title: "NFT with state 3 - Minted - Private",
        public_description: "Minted Stated of the idea",
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 1,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [{
            "user_id": 1, "first_name":"Hello",
            "role": 1,
            "last_name":"World", "profile_pic":"",
            "percentage":49.9, "wallet_connected": true
        }],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    },

    104: {
        id: 104,
        state: 1,
        title: "NFT with state 1",
        public_description: null,
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 1,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [{
            "user_id": 1, "first_name":"Hello",
            "last_name":"World", "profile_pic":"", "percentage":49.9,
            "role": 1,
        }],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    },

    105: {
        id: 105,
        state: 1,
        title: "NFT with state 1 - Draft & Private & Multiple Owners",
        public_description: null,
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 1,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [
            {
                "user_id": 1,
                "role": 1,
                "percentage":5,
                "wallet_connected": false
            },
            {
                "user_id": 2,
                "percentage":10,
                "role": 2,
                "wallet_connected": false
            },
            {
                "user_id": 3,
                "role": 2,
                "percentage":0.9,
                "wallet_connected": false
            }
        ],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    },

    // Empty Boiler Plat
    106: {
        id: 106,
        state: 1,
        title: null,
        public_description: null,
        details: null,
        tags: [],
        visibility: 1,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [],
        royalty: []
    },
};

// Read Listing ideas
export const ideaNftList = [
    {
        id: 105,
        state: 1,
        title: "NFT with state 1 - Draft & Private & Multiple Owners",
        public_description: null,
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 1,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [
            {
                "user_id": 1,
                "role": 1,
                "percentage":5,
                "wallet_connected": false
            },
            {
                "user_id": 2,
                "percentage":10,
                "role": 2,
                "wallet_connected": false
            },
            {
                "user_id": 3,
                "role": 2,
                "percentage":0.9,
                "wallet_connected": false
            }
        ],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    },
    {
        id: 104,
        state: 1,
        title: "NFT with state 1",
        public_description: null,
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 1,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [{
            "user_id": 1, "first_name":"Hello",
            "last_name":"World", "profile_pic":"", "percentage":49.9,
            "role": 1,
        }],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    },
    {
        id: 102,
        state: 1,
        title: "NFT with state 1 - Draft & Private",
        public_description: null,
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 1,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    },
    {
        id: 103,
        state: 3,
        title: "NFT with state 3 - Minted - Private",
        public_description: "Minted Stated of the idea",
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 1,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    },
    {
        id: 101,
        state: 1,
        title: "NFT with state 1 - Draft & Public",
        public_description: null,
        details: "Details",
        tags: ["Tag#1", "Tag#2"],
        visibility: 2,
        cover_image:"",
        color_code:"",
        mint_address: null,
        created_on: "",
        ownership: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}],
        royalty: [{"user_id": 1, "first_name":"Hello", "last_name":"World", "profile_pic":"", "percentage":49.9}]
    }

];

// Read Idea Related - Activities
export const ideaNftActivity = [
    {
      "id": 123,
      "activity_state": 1,
      "modified_by":{ "id":1, "first_name": "XYZ", "last_name": "Hello world", "profile_pic":"" },
      "created_on": "",
      "idea_json_obj": "Created by Brian Smith on 21 Nov 2022, 5:19pm"
    },
    {
      "id": 563,
      "activity_state": 2,
      "modified_by":{ "id":1, "first_name": "XYZ", "last_name": "Hello world", "profile_pic":"" },
      "created_on": "",
      "idea_json_obj": "Details updated by Brian Smith on 22 Nov 2022, 5:19pm"
    },
  ]


// Action types
export const actionTypes = [
    {
        id: 1,
        title: 'Update OwnerShip Percentage',
        color_code: "#fff"
    },
    {
        id: 2,
        title: 'Remove User from OwnerShip',
        color_code: "#fff"
    },
    {
        id: 3,
        title: 'Update Royalty Percentage',
        color_code: "#fff"
    },
    {
        id: 4,
        title: 'Remove User from Royalty',
        color_code: "#fff"
    },
    {
        id: 5,
        title: 'Sell user Share from idea',
        color_code: "#fff"
    },
    {
        id: 6,
        title: ' Sell entire Idea NFT',
        color_code: "#fff"
    },
    {
        id: 7,
        title: 'Archive',
        color_code: "#fff"
    },
];

// Action List
export const activityList = [
    {
        id: 1,
        title: 'Created',
        color_code: "#fff"
    },
    {
        id: 2,
        title: 'Details Updated',
        color_code: "#fff"
    },
    {
        id: 3,
        title: 'User Invited',
        color_code: "#fff"
    },
    {
        id: 4,
        title: 'User Invitation Cancelled',
        color_code: "#fff"
    },
    {
        id: 5,
        title: 'User Added',
        color_code: "#fff"
    },
    {
        id: 6,
        title: 'Ownership Percentage Updated for User',
        color_code: "#fff"
    },
    {
        id: 7,
        title: 'Royalty Percentage Updated for User',
        color_code: "#fff"
    },
    {
        id: 8,
        title: 'Mint Idea',
        color_code: "#fff"
    },

];
