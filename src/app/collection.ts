export class Collecton<T> {
  collection: T[];

  constructor(collection: T[]) {
    this.collection = collection;
  }

  getCollection<T>(collection: T): T {
    return collection;
  }

  getElement<T>(index: number, collection: T[]): T {
    return collection[index];
  }

  clearCollection<T>(): void {
    this.collection = [];
  }

  setElement<T>(index: number, collection: T[], newMeaning: T): void {
    collection[index] = newMeaning;
  }

  deleteElement<T>(index: number, collection: T[], none: T): void {
    collection[index] = none;
  }
}
