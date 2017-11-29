import DateTime from './dateTime';
require('colors');

export default class RequestLogger {
    static ws(message) {
        console.log(`[WS] ${DateTime.getDateTimeStr()} ${message}`.cyan);
    }

    static wsError(message) {
        console.log(`[WS] ${DateTime.getDateTimeStr()} ${message}`.red);
    }

    static wsInfo(message) {
        console.log(`[WS] ${DateTime.getDateTimeStr()} ${message}`.green);
    }

    static error(message) {
        console.log(`[ERROR] ${DateTime.getDateTimeStr()} ${message}`.red);
    }
}
