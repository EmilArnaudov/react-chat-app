export function constructID(user, otherUser) {
    let firstLetter = user.email[0];
    let secondLetter = otherUser.email[0]

    let sum = 0;
    let idString;
    if (firstLetter.charCodeAt(0) < secondLetter.charCodeAt(0)) {
        idString = user.email + otherUser.email;
    } else {
        idString = otherUser.email + user.email; 
    }


    for (let i = 0; i < idString.length; i++) {
        sum += idString.charCodeAt(i);
        sum *= 2
        sum -= 30
    }

    return String(sum);

}   