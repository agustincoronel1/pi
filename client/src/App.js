import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import ActivityCreate from './components/ActivityCreate';
import Detail from './components/Detail';
// import Error from './components/error';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={LandingPage} /> 
      <Route  path="/home" component={Home} /> 
      <Route path="/activities" component={ActivityCreate} />
      <Route path="/countries/:id" component={Detail}/>
      {/* <Route component={Error}/> */}
    </div>
   </BrowserRouter>
  )
}

export default App;
