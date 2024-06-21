import './App.css'
import Header from '@/components/Header';
import IsItFill from './components/IsItFill';


function App() {

  return (
    <div>
      <div className='app__wrapper'>
        <Header />
        <main className='app__main'>
          <IsItFill />
        </main>
        <footer className='app__footer'>
          <span>Made with 💙 by Francisco Solis</span>
        </footer>
      </div>
    </div>
  )
}

export default App
