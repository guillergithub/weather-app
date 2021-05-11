import './App.css';
import './asserts/styles.css'

import Weather from './components/Weather'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='mb-5'>Weather App</h1>        
        <Weather/>
      </header>
      
    </div>
  );
}

export default App;
