export const formatPrice = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
});
