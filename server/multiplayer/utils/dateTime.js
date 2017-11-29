export default class DateTime{
    static getTimeStr(){
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    static getDateStr(){
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }

    static getDateTimeStr(){
        return this.getTimeStr() + ' ' + this.getDateStr();
    }

}