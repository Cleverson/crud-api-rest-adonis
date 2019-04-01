import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import api from '../../services/api'

import Logo from '../../assets/airbnb-logo.svg'
import { Conteiner, Form } from './styles'

class SignUp extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		error: ''
	}

	handleSignUp = async e => {
		e.preventDefault()

		const { username, email, password } = this.state

		if (!username || !email || !password) {
			this.setState({
				error: 'Preencha todos os campos para se cadastrar.'
			})
		} else {
			try {
				await api.post('/users', { username, email, password })
				this.props.history.push('/')
			} catch (error) {
				console.log(error)
				this.setState({
					error: 'Ocorreu um erro ao registrar sua conta. T.T'
				})
			}
		}
	}

	render() {
		return (
			<Conteiner>
				<Form onSubmit={this.handleSignUp}>
					<img src={Logo} alt="Airbnb logo" />
					{this.state.error && <p>{this.state.error}</p>}
					<input
						type="text"
						placeholder="Nome de usuário"
						onChange={e =>
							this.setState({ username: e.target.value })
						}
					/>
					<input
						type="email"
						placeholder="Endereço de e-mail"
						onChange={e => this.setState({ email: e.target.value })}
					/>
					<input
						type="password"
						placeholder="Senha"
						onChange={e =>
							this.setState({ password: e.target.value })
						}
					/>
					<button type="submit">Cadastrar</button>
					<hr />
					<Link to="/">Fazer Login</Link>
				</Form>
			</Conteiner>
		)
	}
}

export default withRouter(SignUp)
