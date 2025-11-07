export const dateFormat = (date: string | Date, locale: string): string => {
    const dateObj = new Date(date);

    const formattedDate = new Intl.DateTimeFormat(locale).format(dateObj);

    return formattedDate;
}