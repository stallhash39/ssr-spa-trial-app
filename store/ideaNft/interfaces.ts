export interface userDetails {
    user_id: number,
    first_name: string,
    last_name: string,
    profile_pic: string
}
export interface ideaInvite{
    id: number,
    email_id: string,
    ownership_percentage: number,
    royalty_percentage: number,
}
export interface Ownership extends userDetails{
    id: number,
    role: number,
    wallet_connected: boolean,
    percentage: number
}
export interface Royalty extends userDetails{
    id: number,
    percentage: number
}
export interface ideaActivity{
    id: number,
    activity_state: number,
    modified_by: userDetails,
    created_on: string,
    idea_json_obj: string,
}
export interface ideaNft {
    id: number,
    title: string,
    state: number,
    public_description: string,
    details: string,
    tags: string[],
    visibility: number,
    cover_image: string
    color_code: string,
    idea_valuation: number,
    mint_address: string,
    ownership:  Ownership[],
    royalty: Royalty[],
    invitations: ideaInvite[],
    activity: ideaActivity[],
    created_on: string,
    created_by: userDetails,
    last_edited_on: string,
    last_edited_by: userDetails,
}
// Constants - Schema
export interface IdTitlePair{
    id: number,
    title: string
}
