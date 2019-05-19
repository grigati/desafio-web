import React from 'react';
import { buscaCEP, enviarCadastro, getUsuario, editarCadastro } from './APIUtils';
import InputMask from 'react-input-mask';

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
          "telefones": [],
          "emails": []
        }
      }

      this.inputEmail = React.createRef();
      this.inputTelefone = React.createRef();
      this.inputTelefoneTipo = React.createRef();
      this.inputRole = React.createRef();
      this.inputSenha = React.createRef();

      this.buscarCEP = this.buscarCEP.bind(this);
      this.changeInput = this.changeInput.bind(this);
      this.adicionarEmail = this.adicionarEmail.bind(this);
      this.adicionarTelefone = this.adicionarTelefone.bind(this);
      this.enviarCadastro = this.enviarCadastro.bind(this);
    }

    componentDidMount() {
      // Verifica se precisa buscar os dados do usuário
      if (this.props.match.params.id) {
        getUsuario(this.props.match.params.id)
        .then(response => {
          // Troca os campos null por string vazia
          let usuario = response;
          for(var key in usuario) {
            if(null === usuario[key]) 
              usuario[key] = '';
          }

          this.setState({usuario: usuario})
        })
        .catch(erro => {
          console.error(erro);
        })
      }
    }

    buscarCEP(event) {
      event.preventDefault();
      buscaCEP(this.state.usuario.cep.replace(/[.-]/g, ""))
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

    enviarCadastro(event) {
      event.preventDefault();
      var usuario = this.state.usuario;
      usuario = {
        ...usuario,
        senha: this.inputSenha.current.value,
        roles: [{
          name: this.inputRole.current.value
        }]
      }

      if (this.props.editar) {
        editarCadastro(usuario)
        .then(response => {
          console.log("Alteração efetuada com sucesso");
          this.setState({
            erro: false,
            sucesso: true
          })
        })
        .catch(erro => {
          console.error(erro);
          this.setState({
            erro: true,
            sucesso: false
          })
        })
      }
      else {
        // Novo cadastro
        enviarCadastro(usuario)
        .then(response => {
          console.log("Cadastro efetuado com sucesso");
          this.setState({
            erro: false,
            sucesso: true
          })
        })
        .catch(erro => {
          console.error(erro);
          this.setState({
            erro: true,
            sucesso: false
          })
        })
      }
    }

    render() {
      if (this.props.usuarioAutenticado) {
        return (
              <div className="mx-auto" style={{maxWidth:"700px"}}>
                <form onSubmit={this.enviarCadastro}>
                <div className="form-group">
                  <label htmlFor="input-role">Tipo do Usuário</label>
                    <select className="form-control" id="input-role" ref={this.inputRole}>
                      <option value="ROLE_ADMIN">Administrador</option>
                      <option value="ROLE_USER">Usuário Comum</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-nome">Nome*</label>
                    <input type="text" className="form-control" id="input-nome" name="nome" value={this.state.usuario.nome} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-senha">Senha*</label>
                    <input type="password" className="form-control" id="input-senha" name="senha" ref={this.inputSenha} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-cpf">CPF*</label>
                    <InputMask mask="999.999.999-99" type="text" className="form-control" id="input-cpf" name="cpf" value={this.state.usuario.cpf} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-cep">CEP*</label>
                    <InputMask mask="99.999-999" type="text" className="form-control" id="input-cep" name="cep" value={this.state.usuario.cep} onChange={this.changeInput} />
                    <button className="btn btn-primary my-2" onClick={(event) => this.buscarCEP(event)}>Buscar CEP</button>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="input-logradouro">Logradouro*</label>
                    <input type="text" className="form-control" id="input-logradouro" name="logradouro" value={this.state.usuario.logradouro} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-complemento">Complemento</label>
                    <input type="text" className="form-control" id="input-complemento" name="complemento" value={this.state.usuario.complemento} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-bairro">Bairro*</label>
                    <input type="text" className="form-control" id="input-bairro" name="bairro" value={this.state.usuario.bairro} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-cidade">Cidade*</label>
                    <input type="text" className="form-control" id="input-cidade" name="cidade" value={this.state.usuario.cidade} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-uf">UF*</label>
                    <input type="text" className="form-control" id="input-uf" name="uf" value={this.state.usuario.uf} onChange={this.changeInput} />
                  </div>

                  <div className="form-group">
                  <label htmlFor="input-telefone-tipo">Tipo do Telefone</label>
                    <select className="form-control mb-2" id="input-telefone-tipo" ref={this.inputTelefoneTipo}>
                      <option>residencial</option>
                      <option>comercial</option>
                      <option>celular</option>
                    </select>

                    <label htmlFor="input-telefone">Telefone*</label>
                    { this.state.usuario.telefones.map((telefone, index) => {
                        return(
                          <div key={index}>
                            {telefone.telefone + " " + telefone.tipo}
                          </div>
                        );
                    })}

                    <InputMask mask={(this.inputTelefoneTipo.current && this.inputTelefoneTipo.current.value === "celular") ? "(99) 99999-9999" : "(99) 9999-9999"} type="text" className="form-control" id="input-telefone" ref={this.inputTelefone} onChange={this.changeInput}/>
                    
                    <button className="btn btn-primary my-2" onClick={this.adicionarTelefone}>Adicionar Telefone</button>
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-email">E-mail*</label>
                    { this.state.usuario.emails.map((email, index) => {
                        return(
                          <div key={index}>
                            {email.email}
                          </div>
                        );
                    })}
                    <input type="email" className="form-control" id="input-email" ref={this.inputEmail}/>
                    <button className="btn btn-primary my-2" onClick={this.adicionarEmail}>Adicionar E-mail</button>
                  </div>

                  <small className="text-muted d-block pb-3">*campo obrigatório</small>
                  
                  <button type="submit" className="btn btn-primary">Enviar</button>

                  { this.state.erro ? 
                    <div className="mt-3 alert alert-danger" role="alert">
                        Houve um erro ao enviar o formulário. Consulte o log do navegador para mais detalhes.
                    </div>
                    : null
                  }

                  { this.state.sucesso ? 
                    <div className="mt-3 alert alert-success" role="alert">
                        Formulário enviado com sucesso.
                    </div>
                    : null
                  }
                </form>
              </div>
          );
        }

        return (
          <div>
              Você precisa entrar para acessar esse recurso.
          </div>
      );
    }
}

export default Cadastro;
