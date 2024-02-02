import './App.css';
import Verses from './components/Verses';
import usfmJS from 'usfm-js'
import usfm from './mocks/en_psa.usfm';

const usfmJSON = usfmJS.toJSON(usfm);
const { chapters } = usfmJSON;
const chapterKey = '1';
const verses = chapters[chapterKey];


function App () {
  return (
    <div style={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
      <Verses
        verses={verses}
        paragraphs
        showUnsupported
      />
    </div>
  );
}

export default App;
