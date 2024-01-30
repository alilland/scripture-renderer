import './App.css';
import Verse from './components/Verse';

function App () {
  return (
    <div className="App">
      <Verse
        verseKey={'1'}
        reference={{
          bookId: 'GEN',
          chapter: 1
        }}
        verseObjects={[
          {}
        ]}
      />
    </div>
  );
}

export default App;
