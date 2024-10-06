import './App.css';
import Inicio from './Inicio';
import {Routes, Route, HashRouter} from "react-router-dom";
import NotFound from './componentes/NotFound';


function App(){
  return(
      <HashRouter>
        <Routes>
          <Route exact path='/'   element={<Inicio/>}/>
          <Route exact path='*'   element={<NotFound/>}/>
        </Routes>
      </HashRouter>
  )
}

export default App;
