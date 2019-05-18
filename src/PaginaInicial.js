import React from 'react';
import  { Redirect } from 'react-router-dom';
import { getUsuarios, deleteUsuario } from './APIUtils';

class PaginaInicial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: null
        }

        this.deletarUsuario = this.deletarUsuario.bind(this);
    }

    componentDidMount() {
        getUsuarios()
        .then(response => {
            this.setState({usuarios: response})
        })
        .catch(erro => {
            console.error(erro);
        });
    }

    deletarUsuario(id, index) {
        deleteUsuario(id)
        .then(response => {
            console.log("Deletado com sucesso")
            const usuarios = this.state.usuarios;
            usuarios.splice(index,index);
            this.setState({
                usuarios: usuarios
            })
        })
        .catch(erro => {
            console.error(erro.message)
        });
    }

    render() {
        if (this.props.usuarioAutenticado) {
            if (this.state.usuarios) {
                return (
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">CEP</th>
                            <th scope="col">Logradouro</th>
                            <th scope="col">Complemento</th>
                            <th scope="col">Bairro</th>
                            <th scope="col">Cidade</th>
                            <th scope="col">UF</th>
                            <th scope="col">Permissões</th>
                            <th scope="col">Telefones</th>
                            { (this.props.usuarioAutenticado.roles[0].name === "ROLE_ADMIN") ?
                                <th scope="col">Ações</th>
                                : null
                            }
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.usuarios.map((usuario, index) => {
                                return (
                                    <tr key={usuario.id}>
                                        <th scope="row">{usuario.id}</th>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.cpf}</td>
                                        <td>{usuario.cep}</td>
                                        <td>{usuario.logradouro}</td>
                                        <td>{usuario.complemento}</td>
                                        <td>{usuario.bairro}</td>
                                        <td>{usuario.cidade}</td>
                                        <td>{usuario.uf}</td>
                                        <td>{usuario.roles[0].name}</td>
                                        <td>{usuario.telefones ?
                                            usuario.telefones.map(telefone => {
                                                return(
                                                    <span key={telefone.id} className="d-block">
                                                        {telefone.telefone} {telefone.tipo}
                                                    </span>
                                                );
                                            })
                                            : <span>Nenhum cadastrado</span>
                                            }
                                        </td>
                                        { (this.props.usuarioAutenticado.roles[0].name === "ROLE_ADMIN") ?
                                            <td>
                                                <button className="btn btn-sm btn-primary px-2 pb-1">Editar</button>
                                                <button className="btn btn-sm btn-primary px-2 pb-1" onClick={() => this.deletarUsuario(usuario.id, index)}>Deletar</button>
                                            </td>
                                            : null
                                        }
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                );
            } else {
                return (
                    <div>
                        Nenhum usuário cadastrado
                    </div>
                );
            }
        }
            
        return (
              <Redirect to="/entrar" />
        );
    }
}

export default PaginaInicial;
