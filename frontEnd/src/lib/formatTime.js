function format() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1 + "";
    let day = d.getDate() + "";
    let hour = d.getHours() + "";
    let minute = d.getMinutes() + "";
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}  ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
}
export {
    format
}