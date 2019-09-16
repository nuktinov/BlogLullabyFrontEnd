export default function dateFormatter(dates) {
    const nowDate = dateObject(new Date());
    const formattedDate = dateObject(new Date(dates));
    let result = formattedDate.time + ' ';
    if(formattedDate.day != nowDate.day 
        || formattedDate.month != nowDate.month 
        || formattedDate.year != nowDate.year) {
        result += `${formattedDate.day}.${formattedDate.month}`;
        if(formattedDate.year != nowDate.year)
            result += `.${formattedDate.year}`;
    }
    return result;   
}

function dateObject(date) {
    return {
        day: numberFormatter(date.getDate()),
        year: numberFormatter(date.getFullYear()),
        month: numberFormatter(date.getMonth() + 1),
        time: numberFormatter(date.getHours()) + ':' + numberFormatter(date.getMinutes())
    }
}

function numberFormatter (number) {
    return number < 10 ? `0${number}` : number;
}

export function dateFormatter2(dates) {
    const nowDate = dateObject(new Date());
    const formattedDate = dateObject(new Date(dates));
    let result = '';
    if(formattedDate.day != nowDate.day 
        || formattedDate.month != nowDate.month 
        || formattedDate.year != nowDate.year) {
        result += `${formattedDate.day}.${formattedDate.month}`;
        if(formattedDate.year != nowDate.year)
            result += `.${formattedDate.year}`;
        return result;
    }
    result += formattedDate.time;
    return result;   
}