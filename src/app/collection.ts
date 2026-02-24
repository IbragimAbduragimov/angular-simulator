export class Collecton {

  constructor() {
    
  }

  getCollection<T>(collection: T) {
    return collection;
  }

  getElement<T>(index: number, collection: T[]) {
    return collection[index]
  }

  clearCollection<T>(collection: T, zero: T) {
    collection = zero;
  }

  setElement<T>(index: number, collection: T[], newMeaning: T) {
    collection[index] = newMeaning;
  }

  deleteElement<T>(index: number, collection: T[], zero: T) {
    collection[index] = zero;
  }
}
