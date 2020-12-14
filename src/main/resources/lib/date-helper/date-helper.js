const moment = require('/assets/momentjs/2.24.0/min/moment-with-locales.min.js');

exports.addDays = function (date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy
};

exports.getDaysBetween = function (date1, date2) {
    return moment(date1).diff(date2, 'days');
};

exports.toESDateFormat = function (date) {
    return moment(date).format("YYYY-MM-DD");
};
