import React from 'react';
import { getUsuarios, deleteUsuario } from './APIUtils';
import { Link } from 'react-router-dom';

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
            usuarios.splice(index, 1);
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
                                        <td>{usuario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")}</td>
                                        <td>{usuario.cep.replace(/(\d{2})(\d{3})(\d{3})/g, "$1.$2-$3")}</td>
                                        <td>{usuario.logradouro}</td>
                                        <td>{usuario.complemento}</td>
                                        <td>{usuario.bairro}</td>
                                        <td>{usuario.cidade}</td>
                                        <td>{usuario.uf}</td>
                                        <td>{ (usuario.roles && usuario.roles[0]) ? usuario.roles[0].name : "Não definido"}</td>
                                        <td>{usuario.telefones ?
                                            usuario.telefones.map(telefone => {
                                                return(
                                                    <span key={telefone.id} className="d-block">
                                                        {telefone.telefone + " (" + telefone.tipo + ")"}
                                                    </span>
                                                );
                                            })
                                            : <span>Nenhum cadastrado</span>
                                            }
                                        </td>
                                        { (this.props.usuarioAutenticado.roles[0].name === "ROLE_ADMIN") ?
                                            <td>
                                                <Link to={`/editar/${usuario.id}`}><button className="btn btn-sm btn-primary mx-2 mb-1">Editar</button></Link>
                                                <button className="btn btn-sm btn-primary mx-2 mb-1" onClick={() => this.deletarUsuario(usuario.id, index)}>Deletar</button>
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
            <div>
                Você precisa entrar para acessar esse recurso.
            </div>
        );
    }
}

export default PaginaInicial;
