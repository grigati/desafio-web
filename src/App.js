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
        <Link to="/entrar">Entrar</Link>
        <Link to="/cadastrar">Cadastrar</Link>

        <div>
          <Switch>  
            <Route exact path="/" component={PaginaInicial} />
            <Route path="/entrar" 
                  render={(props) => <Login onEntrarSucesso={this.handleEntrar} {...props} /> } />
            <Route path="/cadastrar" component={Cadastro} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
