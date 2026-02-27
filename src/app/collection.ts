export class Collecton<T> {

  collection: T;
  index: number;
  none: null;
  newMeaning: T;

  constructor(collection: T, index: number, none: null, newMeaning: T) {
    this.collection = collection
    this.index = index;
    this.none = none;
    this.newMeaning = newMeaning 
  }

  getCollection<T>(collection: T): T {
    return collection;
  }

  getElement<T>(index: number, collection: T[]): T {
    return collection[index]
  }

  clearCollection<T>(collection: T, none: T): void {
    collection = none;
  }

  setElement<T>(index: number, collection: T[], newMeaning: T): void {
    collection[index] = newMeaning;
  }

  deleteElement<T>(index: number, collection: T[], none: T): void {
    collection[index] = none;
  }
}
