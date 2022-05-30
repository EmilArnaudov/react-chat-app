import { constructID } from "./helpers";

export function chatExists(user, otherUser) {
    let chatID = constructID(user, otherUser);
    console.log(chatID);

}