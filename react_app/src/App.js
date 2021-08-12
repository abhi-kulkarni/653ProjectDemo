import './App.css';
import { Switch, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
        <Header/>
          <div style={{ paddingTop: '93px' }}>
          <Switch>
            <Route exact path='/' component={IndexPage} />
          </Switch>
          </div>
      <Footer/>
    </div>
  );
}

export default App;
