import React from 'react';
import { buscaCEP } from './APIUtils';

class Cadastro extends React.Component {
    constructor(props) { 
      super(props);

      this.state = {
        usuario: {
          "nome": "",
          "cpf": "",
          "cep": "",
          "logradouro": "",
          "complemento": "",
          "bairro": "",
          "cidade": "",
          "uf": "",
          "complemento": "",
          "telefones": [],
          "emails": []
        }
      }

      this.inputEmail = React.createRef();
      this.inputTelefone = React.createRef();
      this.inputTelefoneTipo = React.createRef();
      this.buscarCEP = this.buscarCEP.bind(this);
      this.changeInput = this.changeInput.bind(this);
      this.adicionarEmail = this.adicionarEmail.bind(this);
      this.adicionarTelefone = this.adicionarTelefone.bind(this);
    }

    buscarCEP(event) {
      event.preventDefault();
      console.log(this.state.usuario.cep)
      buscaCEP(this.state.usuario.cep)
      .then(response => {
        this.setState({usuario: {
          ...this.state.usuario,
          logradouro: response.logradouro,
          complemento: response.complemento,
          bairro: response.bairro,
          cidade: response.localidade,
          uf: response.uf
        }})

      })
      .catch(erro => {
        console.error(erro)
      });
    }

    changeInput(event) {
      this.setState({
        usuario : {
          ...this.state.usuario,
          [event.target.name]: event.target.value
        }
      });
    }

    adicionarEmail(event) {
      event.preventDefault();
      const emails = this.state.usuario.emails;
      emails.push({email: this.inputEmail.current.value});
      this.setState({
        usuario : {
          ...this.state.usuario,
          emails: emails
        }
      });
    }

    adicionarTelefone(event) {
      event.preventDefault();
      const telefones = this.state.usuario.telefones;
      telefones.push({
        telefone: this.inputTelefone.current.value,
        tipo: this.inputTelefoneTipo.current.value
      });
      
      this.setState({
        usuario : {
          ...this.state.usuario,
          telefones: telefones
        }
      });
    }

    render() {
        return (
              <div className="mx-auto" style={{maxWidth:"700px"}}>
                <form>
                  <div className="form-group">
                    <label htmlFor="input-nome">Nome</label>
                    <input type="text" className="form-control" id="input-nome" name="nome" value={this.state.usuario.nome} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-senha">Senha</label>
                    <input type="password" className="form-control" id="input-senha" name="senha" value={this.state.usuario.senha} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-cpf">CPF</label>
                    <input type="text" className="form-control" id="input-cpf" name="cpf" value={this.state.usuario.cpf} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-cep">CEP</label>
                    <input type="text" className="form-control" id="input-cep" name="cep" value={this.state.usuario.cep} onChange={this.changeInput} />
                    <button className="btn btn-primary" onClick={(event) => this.buscarCEP(event)}>Buscar CEP</button>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="input-logradouro">Logradouro</label>
                    <input type="text" className="form-control" id="input-nome" name="logradouro" value={this.state.usuario.logradouro} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-complemento">Complemento</label>
                    <input type="text" className="form-control" id="input-nome" name="complemento" value={this.state.usuario.complemento} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-bairro">Bairro</label>
                    <input type="text" className="form-control" id="input-bairro" name="bairro" value={this.state.usuario.bairro} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-cidade">Cidade</label>
                    <input type="text" className="form-control" id="input-cidade" name="cidade" value={this.state.usuario.cidade} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-uf">UF</label>
                    <input type="text" className="form-control" id="input-uf" name="uf" value={this.state.usuario.uf} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-telefone">Telefone</label>
                    { this.state.usuario.telefones.map((telefone, index) => {
                        return(
                          <div key={index}>
                            {telefone.telefone + " " + telefone.tipo}
                          </div>
                        );
                    })}

                    <input type="text" className="form-control" id="input-telefone" ref={this.inputTelefone} />
                    
                    <label htmlFor="input-telefone-tipo">Tipo do Telefone</label>
                    <select className="form-control" id="input-telefone-tipo" ref={this.inputTelefoneTipo}>
                      <option>residencial</option>
                      <option>comercial</option>
                      <option>celular</option>
                    </select>
                    <button className="btn btn-primary" onClick={this.adicionarTelefone}>Adicionar Telefone</button>
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-email">E-mail</label>
                    { this.state.usuario.emails.map((email, index) => {
                        return(
                          <div key={index}>
                            {email.email}
                          </div>
                        );
                    })}
                    <input type="email" className="form-control" id="input-email" ref={this.inputEmail}/>
                    <button className="btn btn-primary" onClick={this.adicionarEmail}>Adicionar E-mail</button>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
              </div>
          );
    }
}

export default Cadastro;
