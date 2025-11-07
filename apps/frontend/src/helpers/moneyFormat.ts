export const moneyFormat = (locale: string, value: number, currencyText: string): string => {
    const formattedString = Intl.NumberFormat(locale).format(value);
    return formattedString.concat(' ', currencyText);
};