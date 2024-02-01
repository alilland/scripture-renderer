import chunkContainsVerse from './chunkContainsVerse'
import chunkContainsVerseRange from './chunkContainsVerseRange'

function doChunksContainChunk (verseChunks, searchChunk, strict) {
  for (const verseChunk of verseChunks) {
    if (searchChunk.endVerse) {
      if (chunkContainsVerseRange(verseChunk, searchChunk, strict)) {
        return true;
      }
    } else {
      if (chunkContainsVerse(verseChunk, searchChunk.chapter, searchChunk.verse)) {
        return true;
      }
    }
  }
  return false;
}

export default doChunksContainChunk
