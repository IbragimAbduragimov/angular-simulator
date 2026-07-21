/* eslint-disable no-unassigned-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
function sumNumbers(a: number, b: number): number {
  return a + b;
}

let uploadStatus: 'loading' | 'success' | 'error';

let textFormat: 'uppercase' | 'capitalize' | 'lowercase';

interface IUser {
  name: string;
  age: number;
  status?: string;
}

interface IStudent extends IUser {
  evaluations: number;
}

function formatText(text: string, option: string): string {
  if (textFormat === 'uppercase') {
    return text.toUpperCase();
  } else if (textFormat === 'capitalize') {
    return text.charAt(0).toUpperCase() + text.charAt(1).toLowerCase();
  } else {
    return text.toLowerCase();
  }
}

function removeChar(text: string, char: string): string[] {
  return text.split(char);
}

const users: IUser[] = [
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
  },
];

const youngUsers: IUser[] = users.filter((user: IUser) => user.age < 30);
