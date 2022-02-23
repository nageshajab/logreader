
function getTimeInMilliseconds(readUpTo) {
    if (readUpTo.toString().indexOf('d')) {
        return addHoursInDay(readUpTo);
    }
    if (readUpTo.toString().indexOf('h')) {
        return addHours(readUpTo);
    }   
}
function addHoursInDay(d) {
    d = d.toString().replace('d', '');
    const daysAgo = new Date(+(new Date()) - d * 24 * 60 * 60 * 1000);
//    console.log(daysAgo);
    return daysAgo.getTime();
}

function addHours(h) {
    h = h.toString().replace('h', '');
    const hoursAgo = new Date(+(new Date()) - h * 60 * 60 * 1000);
    return hoursAgo.getTime();
}

module.exports = {
    getTimeInMilliseconds,
    addHoursInDay,
    addHours
}