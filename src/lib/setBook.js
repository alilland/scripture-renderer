import getVerses from "./getVerses";

const setBook = (bookData, ref) => {
  class Book {
    constructor(verses) {
      this.verses = verses;
    }
    forEachVerse(
      callback = (verseObjects, verseRef) => null,
      { failOnMissingVerse = true } = { failOnMissingVerse: true }
    ) {
      const verseRefs = this.verses;
      for (const verseRef of verseRefs) {
        if (!verseRef.verseData && failOnMissingVerse) {
          return null;
        }
        const verseData = verseRef.verseData;
        let verseObjects; // (verseData && verseData.verseObjects);
        if (verseData) {
          if (typeof verseData === "string") {
            verseObjects = [{ text: verseData }];
          } else if (Array.isArray(verseData)) {
            verseObjects = verseData;
          } else if (verseData.verseObjects) {
            verseObjects = verseData.verseObjects;
          }
          callback(verseObjects, verseRef);
        }
      }
    }
  }
  return new Book(getVerses(bookData, ref));
};

export default setBook;
