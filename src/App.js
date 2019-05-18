import React from 'react';
import { Route, Link, Switch } from "react-router-dom";
import PaginaInicial from './PaginaInicial';
import Login from './Login';
import Cadastro from './Cadastro';
import { getUsuarioAutenticado } from './APIUtils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isLoading: false
    }

    this.handleEntrar = this.handleEntrar.bind(this);
    this.handleSair = this.handleSair.bind(this);
    this.carregarUsuario = this.carregarUsuario.bind(this); 
  }

  carregarUsuario() {
    getUsuarioAutenticado()
    .then(response => {
      this.setState({
        currentUser: response
      });
    }).catch(error => {
      console.error(error);
      this.setState({
        currentUser: null
      });  
    });
  }

  componentDidMount() {
    this.carregarUsuario();
  }

  handleSair() {
    localStorage.removeItem('ACCESS_TOKEN');

    this.setState({
      currentUser: null
    });
  }

  handleEntrar() {
    this.carregarUsuario();
  }

  render() {
    return (
      <div>
        <div className="pb-3">
          <Link to="/" className="px-2">Página Inicial</Link>
          <Link to="/entrar" className="px-2">Entrar</Link>
          <Link to="/cadastrar" className="px-2">Cadastrar</Link>
          { this.state.currentUser ? 
            <div className="d-inline">
              <span className="px-2"> Olá, {this.state.currentUser.nome}</span>
              <button className="btn btn-sm btn-primary" onClick={this.handleSair}>Sair</button>
            </div>
            : null
          }
        </div>

        <div>
          <Switch>  
            <Route exact path="/"
                   render={(props) => <PaginaInicial usuarioAutenticado={this.state.currentUser} {...props} /> }  />
            <Route path="/entrar" 
                   render={(props) => <Login onEntrarSucesso={this.handleEntrar} {...props} /> } />
            <Route path="/cadastrar" 
                   render={(props) => <Cadastro usuarioAutenticado={this.state.currentUser} {...props} /> }  />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
