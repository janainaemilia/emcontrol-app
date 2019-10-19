import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { login } from '../actions/authActions'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'

import CustomInput from '../common/form/input'
import lightBlue from '@material-ui/core/colors/lightBlue'

import ForgorPassword from './forgotPassword'
import NewClient from './addClient'

import Messages from '../common/msg/messages'
import logo from '../common/images/logo2.png'
import If from '../common/operator/if'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: '10%',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    // marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: lightBlue[900]
  },
  logo: {
      width: 235,
  },
  logoImage: {
      width: '100%'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '-10px',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    // backgroundColor: lightBlue[800],
    color: lightBlue[800],
    fontSize: '11px'
  },
  button: {
      margin: theme.spacing.unit,
  },
  bgPage: {
      width: '100%',
      backgroundColor: '#07364c',
      display: 'flex',
      height: '-webkit-fill-available'
  }
})

/**
 * Login
 * @class
 * @memberorf Auth
 */
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { page: '/' }
        this.routeChange = this.routeChange.bind(this)
        this.changePage = this.changePage.bind(this)
        this.renderLogin = this.renderLogin.bind(this)
        this.renderForgotPassword = this.renderForgotPassword.bind(this)
        this.renderNewClient = this.renderNewClient.bind(this)
    }

    onSubmit(values) {
        this.props.login(values)
    }
    
    routeChange(route){
        this.props.history.push(route);
    }

    changePage(e, value){
        e.preventDefault()
        this.setState({ page: value })
    }

    renderLogin(){
        const { classes } = this.props
        const { handleSubmit } = this.props

        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                <Paper className={classes.paper}>
                    <div className={classes.logo}>
                        <img src={logo} className={classes.logoImage} alt="EMControl" />
                    </div>
                    {/* <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />                        
                    </Avatar> */}
                    {/* <Typography component="h1" variant="h5">Login</Typography> */}
                    <form className={classes.form} onSubmit={handleSubmit(v => this.onSubmit(v))}>
                        <Field
                            component={CustomInput}
                            name='login'
                            label="Login"
                            required
                            ref='login' />

                        <Field
                            component={CustomInput}
                            name='senha'
                            type='password'
                            label="Senha"
                            required
                            ref='password' />

                        <FormControl fullWidth>
                            <InputLabel htmlFor="senha">Esqueceu sua senha?
                                <a href="/" onClick={(event) => this.changePage(event, '/forgot-password')}> Clique aqui</a>
                            </InputLabel>
                        </FormControl>                        
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className={classes.submit}
                        >
                            Entrar
                        </Button>
                        
                        <Button type="button" fullWidth variant="outlined"
                                color="primary" className={classes.submit}
                                onClick={(event) => this.changePage(event, '/new-client')}>
                                Cadastre-se                                                                        
                        </Button>
                    </form>
                </Paper>
                <Messages />
            </main>
            </div>
        )
    }

    renderForgotPassword(){
        return <ForgorPassword changePage={this.changePage} />
    }

    renderNewClient(){
        return <NewClient changePage={this.changePage} />
    }
    
	/**
	 * 
	 */
	render() {
        return (
            <div>
                    <CssBaseline />
                    <If test={this.state.page === '/'}>
                        { this.renderLogin() }
                    </If>
                    <If test={this.state.page === '/forgot-password'}>
                        { this.renderForgotPassword() }
                    </If>
                    <If test={this.state.page === '/new-client'}>
                        { this.renderNewClient() }
                    </If>
            </div>
        )
	}
}

Login = reduxForm({form: 'loginForm'})(Login)
const mapStateToProps = state => ({auth: state.auth})   
const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch)
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login))