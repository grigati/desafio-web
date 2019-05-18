import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PaginaInicial from './PaginaInicial';
import Login from './Login';
import Cadastro from './Cadastro';

function App() {
  return (
    <Router>
      <Link to="/entrar">Entrar</Link>
      <Link to="/cadastrar">Cadastrar</Link>

      <div>
        <Route exact path="/" component={PaginaInicial} />
        <Route path="/entrar" component={Login} />
        <Route path="/cadastrar" component={Cadastro} />
      </div>
    </Router>
  );
}

export default App;
