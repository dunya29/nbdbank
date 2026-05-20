// Преобразование чисел в строки с разделителями тысячных
function intToStrGroup(value) {
    return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

// Преобразование строки в число (отбрасываем пробелы и строковые)
function strToInt(str) {
    return Number(str.replace(/[\s|\W]/g, ''));
}
