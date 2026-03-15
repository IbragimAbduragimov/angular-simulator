//создвть функцию которая возвращает сумму двух чисел. полностью типизировать
function sumNumbers(a:number, b:number): number {
  return a + b;
}

//создать переменную которая может быть только:
//"loading", "success", "error".
let uploadStatus: "loading" | "success" | "error";

//создать переменную которая может быть только:
//'uppercase', 'lowercase', 'capitalize'".
let textFormat: 'uppercase' | 'capitalize' | 'lowercase';

// Создать интерфейс, который описывает юзера.
interface IUser {
  name: string;
  age: number;
  status?: string;
}

//создать интерфейс унаследованный от IUser
interface IStudent extends IUser {
  evaluations: number;
}

//создать функцию которая  которая принимает строку и вариант,
//как именно форматировать строку (задание №5) и на основе этого возвращает форматированную строку.
function formatText(text: string, option: string): string {
  if (textFormat == 'uppercase') {
    return text.toUpperCase();
  }
  if (textFormat == 'capitalize') {
    return text.charAt(0).toUpperCase() + text.charAt(1).toLowerCase();
  }
  if (textFormat == 'lowercase') {
    return text.toLowerCase();
  }
  return text;
}
// Создать функцию, которая принимает строку и символ, возвращает строку без переданного символа.
function removeChar(text: string, char: string): string[] {
    return text.split(char);
}

// Создать массив объектов на основе интерфейса с задания №6.
// Отфильтровать его по одному из параметров
let users: IUser[] = [
  {
    name: 'ibragim',
    age: 15,
  },
  {
    name: 'vladislav',
    age: 20,
  },
  {
    name: 'alex',
    age: 38,
  }
]

let youngUsers: IUser[] = users.filter((user: IUser) => user.age < 30);
