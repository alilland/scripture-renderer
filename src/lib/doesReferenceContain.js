import { parseReferenceToList } from './referenceHelpers'
import doChunksContainChunk from './doChunksContainChunk'

/**
 * Tests if a given reference is contained within another given reference.
 *
 *
 * @param {string} refToSearch - formats such as “2:4-5”, “2:3a”, “2-3b-4a”, “2:7,12”, “7:11-8:2”, "6:15-16;7:2", "2-3", "2:7ff"
 * @param {string} refSearchTerm - formats such as “2:4”, “2:3a”, "1:9999", "2:1-3", "2:12-4:1", 1:2-3:2 (supports verse ranges, not chapter range or 'ff')
 * @param {string} strict - flag to determine if entire range of refSearchTerm should be contained in refToSearch. Default false
 * @returns {boolean} - true if refSearchTerm exists within refToSearch, false if otherwise
 */
function doesReferenceContain(refToSearch, refSearchTerm, strict = false) {
  const verseChunksToSearch = parseReferenceToList(refToSearch);
  const refSearchChunks = parseReferenceToList(refSearchTerm);

  for (const searchChunk of refSearchChunks) {
    if (doChunksContainChunk(verseChunksToSearch, searchChunk, strict)) {
      if (!strict) return true;
    } else {
      if (strict) return false;
    }
  }
  return strict ? true : false;
}

export default doesReferenceContain
