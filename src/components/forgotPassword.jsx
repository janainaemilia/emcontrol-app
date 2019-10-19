import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { BrowserRouter } from 'react-router-dom'
import { recuperarSenha } from '../actions/authActions'

import Messages from '../common/msg/messages'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import CustomInput from '../common/form/input'
import lightBlue from '@material-ui/core/colors/lightBlue'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: 80,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: lightBlue[900]
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
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
 * @memberof Auth
 */
class ForgotPassword extends Component {
	constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount(){
        console.log('this')
    }

    onSubmit(values) {
        this.props.recuperarSenha(values)
    }
    
	/**
	 * 
	 */
	render() {
        const { classes } = this.props
        const { handleSubmit } = this.props

        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Recuperar senha</Typography>
                        <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                            <Field
                                component={CustomInput}
                                name='email'
                                label="E-mail"
                                ref='email' />
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                            >
                                Enviar
                            </Button>
                            <BrowserRouter>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="senha">
                                        <a href="/" onClick={(event) => this.props.changePage(event, '/')}>Voltar</a>
                                    </InputLabel>
                                </FormControl>
                            </BrowserRouter>
                        </form>
                    </Paper>
                    <Messages />
                </main>
            </div>
        )
	}
}

ForgotPassword = reduxForm({form: 'forgotPasswordForm', destroyOnUnmount: false})(ForgotPassword)
const mapStateToProps = state => ({auth: state.auth})
const mapDispatchToProps = dispatch => bindActionCreators({recuperarSenha}, dispatch)
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword))