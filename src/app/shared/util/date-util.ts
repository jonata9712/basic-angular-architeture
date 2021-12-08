import * as moment from "moment";

export class DateUtil {
    public static getInterval(date: Date) {
        let currentDate = new Date();
        date = new Date(date);

        let dias = Math.floor(
            (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
                - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) / (1000 * 60 * 60 * 24));

        let horas = Math.floor(
            (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours())
                - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())) / (1000 * 60 * 60) % 24)

        return `${dias} dias ${horas} horas`;
    }

    public static formatDate(input: string) {
        // console.log('data: '+data);
        var data = moment(input, "YYYY-MM-DD").toDate()
        let dataFormatada = (( data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()  )) 
        + "/" +  (data.getMonth() < 9 ? '0' +(data.getMonth() + 1) : (data.getMonth() + 1) ) + "/" + data.getFullYear();
        return dataFormatada;
    }
    public static formatDateTime(data: Date) {
        let dataFormatada = (( data.getDate() < 10 ? '0'+data.getDate() : data.getDate()  )) 
        + "/" +  (data.getMonth() < 9 ? '0' +(data.getMonth() + 1) : (data.getMonth() + 1) ) + "/" + data.getFullYear() 
        +' '+(data.getHours() < 10 ? '0'+data.getHours() : data.getHours())+':'+(data.getMinutes() < 10 ? '0'+data.getMinutes() : data.getMinutes())
        +':'+(data.getSeconds() < 10 ? '0'+data.getSeconds() : data.getSeconds());
        return dataFormatada;
    }

    public static getDataAtual(){
        const data = new Date();
        let dataFormatada = (( data.getDate() < 10 ? '0'+data.getDate() : data.getDate()  )) 
        + "/" +  (data.getMonth() < 9 ? '0' +(data.getMonth() + 1) : (data.getMonth() + 1) ) + "/" + data.getFullYear();
        return dataFormatada;
    }

    public static getTimeFromMilliseconds(long: any) {


        let horas = Math.floor(long / (1000 * 60 * 60))
        let minutos = Math.floor(long / (1000 * 60) % 60)

        let segundos = Math.floor(long / (1000) % 60)

        var str = long / (1000 * 60 * 60 * 24) + ' dias ' + long / (1000 * 60 * 60) % 24 + ' horas '
        return `${horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

    }
}
