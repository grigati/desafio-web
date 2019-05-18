import React from 'react';
import { solicitarLogin } from './APIUtils';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.cpf = React.createRef();
        this.senha = React.createRef();

        this.state = {
            erro: null
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const login = {
            cpf: this.cpf.current.value,
            senha: this.senha.current.value
        }

        solicitarLogin(login)
        .then(response => {
            this.props.onEntrarSucesso();
        })
        .catch(error => {
            this.setState({
                erro: error
            });
        });
      }

    render() {
        return (
            <div className="mx-auto" style={{maxWidth:"700px"}}>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputcpf1">CPF</label>
                        <input type="text" className="form-control" id="exampleInputcpf1" aria-describedby="cpfHelp" ref={this.cpf} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" ref={this.senha} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                { this.state.erro ? 
                    <div className="alert alert-danger" role="alert">
                        Houve um erro ao fazer o login.
                        { this.state.erro }
                    </div>
                  : null
                }
            </div>
        );
    }
}

export default Login;