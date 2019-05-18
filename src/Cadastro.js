import React from 'react';

class Cadastro extends React.Component {
    constructor(props) { 
      super(props);
    }
    render() {
        return (
              <div className="mx-auto" style={{maxWidth:"700px"}}>
                <form>
                  <div className="form-group">
                    <label htmlFor="input-nome">Nome</label>
                    <input type="text" className="form-control" id="input-nome" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-senha">Senha</label>
                    <input type="password" className="form-control" id="input-senha" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-cpf">CPF</label>
                    <input type="text" className="form-control" id="input-cpf" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-cep">CEP</label>
                    <input type="text" className="form-control" id="input-cep" />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="input-logradouro">Logradouro</label>
                    <input type="text" className="form-control" id="input-nome" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-bairro">Bairro</label>
                    <input type="text" className="form-control" id="input-bairro" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-cidade">Cidade</label>
                    <input type="text" className="form-control" id="input-cidade" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-uf">UF</label>
                    <input type="text" className="form-control" id="input-uf" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-telefone">Telefone</label>
                    <input type="text" className="form-control" id="input-telefone" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-email">E-mail</label>
                    <input type="email" className="form-control" id="input-email" />
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
              </div>
          );
    }
}

export default Cadastro;
