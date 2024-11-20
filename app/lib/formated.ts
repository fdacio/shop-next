export function formatDate(dateSt : string) {

    let date = new Date(dateSt);

    const dateFormated = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: undefined,
        timeZone: 'America/Sao_Paulo',
    }).format(date);

    return dateFormated;

}

export function formatDateTime(dateSt : string) {

    let date = new Date(dateSt);

    const dateFormated = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: undefined,
        timeZone: 'America/Sao_Paulo',
    }).format(date);

    const timeFormated = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: undefined,
        timeStyle: 'medium',
        timeZone: 'America/Sao_Paulo',
    }).format(date);

    return dateFormated + " " + timeFormated;

}

export function formatMoney(money : number) {

    const moneyFormated = new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    });

    return moneyFormated.format(money);
}