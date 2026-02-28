import { Color } from "../enums/Color";

function sum(a:number, b:number):number {
  return a + b;
}

let statuss: "loading" | "success" | "error";

let textFormat: 'uppercase' | 'capitalize' | 'lowercase';

interface IUser {
  name: string;
  age: number;
  status?: string;
}

interface IStudent extends IUser {
  evaluations: number;
}

function getFormatString(str: string, textFormat: string): string {
  if (textFormat == 'uppercase') {
    return str.toUpperCase();
  }
  else if (textFormat == 'capitalize') {
    return str.charAt(0).toUpperCase() + str.charAt(1).toLowerCase();
  }
  else {
    return str.toLowerCase();
  }
}

function removeChar(str: string, char: string): string[] {
    return str.split(char);
}

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

