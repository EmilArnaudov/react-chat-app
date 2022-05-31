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

export function formatLastSeen(lastSeen) {
    let now = Date.now();
    let timeDiff = now - lastSeen;

    let seconds = Math.floor(timeDiff / 1000);
    if (seconds < 60) {
        return `${seconds} seconds`;
    }

    let minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minutes`;

    }

    let hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hours`
      ;
    }

    let days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days} days`

    }

    let weeks = Math.floor(days / 7)
    if (weeks < 4) {
        return `${weeks} weeks`

    }

    let months = Math.floor(weeks / 4)
    if (months < 12) {
        return `${months} months`
    }

    let years = Math.floor(months / 12);
    return `${years} years`


} 