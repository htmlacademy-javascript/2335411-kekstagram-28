// Построить функцию для проверки длины строки, она должна принимать строку(string) и максимальную длину(length)
// возвращать true если string <= length, false > length

// // // Cтрока короче 20 символов
// // имяФункции('проверяемая строка', 20); // true
// // // Длина строки ровно 18 символов
// // имяФункции('проверяемая строка', 18); // true
// // // Строка длиннее 10 символов
// // имяФункции('проверяемая строка', 10); // false

const getCount = (string, length) => {
  if (string.length <= length) {
    return true;
  } else {
    return false;
  }
};
getCount('проверка слова', 10);

// Построить function для проверки палиндрома


const isPalindrome = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');
  let reverseString = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  return tempString === reverseString;

};

