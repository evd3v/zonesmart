/**
 * @param {string} date дата, в формате ISO
 * @description Форматирует строку в формате ISO в формат dd.mm.yyyy
 * @return {string}
 */
export const formatISODate = (date) => {
    return date
        .split('T')[0]
        .split('-')
        .reverse()
        .join('.')
}

/**
 * @param {Number} price цена
 * @param {String} currency код валюты (пример - USD)
 * @description Форматирует цену, в формат стоимости (с указанием валюты)
 * @return {string}
 */
export const formatPriceCurrency = (price, currency) => {
    return new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency
    }).format(price)
}

/**
 * @param {Array<string>} declinations массив со склонениями названия
 * @param {Number} count количество предметов
 * @description Возвращает верное сколенение для переданного количества предметов
 * @return {String}
 */
export const getItemDeclination = (declinations, count) => {
    const hundred_remainder = Math.abs(count) % 100
    const decimal_remainder = Math.abs(count) % 10
    if (hundred_remainder > 10 && hundred_remainder < 20) return declinations[2]
    if (decimal_remainder > 1 && decimal_remainder < 5) return declinations[1]
    if (decimal_remainder === 1) return declinations[0]

    return declinations[2]
}
