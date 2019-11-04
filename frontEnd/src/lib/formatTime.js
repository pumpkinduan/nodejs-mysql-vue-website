function format() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hour < 10 ) {
        hour = '0' + hour
    }
    if (minute < 10 ) {
        minute = '0' + minute
    }
    return `${year}-${month}-${day}  ${hour}:${minute}`;
}
export {
    format
}