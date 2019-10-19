import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { editar, buscarCliente } from '../actions/usuarioActions'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormGroup from '@material-ui/core/FormGroup'
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
      marginTop: 100,
      [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
        width: 500,
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
    icon: {
        fontSize: '30px'
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
        // width: '100%',
        // backgroundColor: '#07364c',
        // display: 'flex',
        // height: '-webkit-fill-available'
    },
    // formGroup: {
    //     width: 310,
    //     float: 'left',
    //     marginRight: 30
    // },
    type: {
        width: '100%',
        display: 'block',
    },
    selectInput: {
      marginTop: 50
    }
  })

/**
 * EditProfile
 * @class
 * @memberof Auth
 */
class EditProfile extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

	/**
	 * 
	 */
	componentWillMount() {
        this.props.buscarCliente(this.props.usuario)
    }
    
	onSubmit(values) {
        this.props.editar(values)
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
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">Editar Dados</Typography>
                        <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                            <FormGroup className={classes.formGroup}>
                                <Field
                                    component={CustomInput}
                                    name='nome'
                                    label="Nome"
                                    ref='nome' />
                                <Field
                                    component={CustomInput}
                                    name='email'
                                    label="Email"
                                    readOnly={true}
                                    ref='email' />
                                <Field
                                    component={CustomInput}
                                    name='tipo'
                                    label="Tipo"
                                    readOnly={true}
                                    ref='tipo' />
                                 <Field
                                    component={CustomInput}
                                    name='endereco'
                                    label="Endereço"
                                    ref='endereco' />
                                 <Field
                                    component={CustomInput}
                                    name='bairro'
                                    label="Bairro"
                                    ref='bairro' />
                                 <Field
                                    component={CustomInput}
                                    name='cidade'
                                    label="Cidade"
                                    ref='cidade' />
                                <Field
                                    component={CustomInput}
                                    name='estado'
                                    label="Estado"
                                    ref='estado' />
                                <Field
                                    component={CustomInput}
                                    name='usuario.login'
                                    label="Login"
                                    readOnly={true}
                                    ref='login' />
                                <Field
                                    component={CustomInput}
                                    name='usuario.senha'
                                    label="Senha"
                                    type={'password'}
                                    ref='senha' />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Salvar Alterações
                                </Button>
                            </FormGroup>
                        </form>
                    </Paper>
                </main>
            </div>
        )
	}
}

EditProfile = reduxForm({form: 'EditProfileForm', destroyOnUnmount: false})(EditProfile)
const mapStateToProps = state => ({ cliente: state.cliente, usuario: state.auth.usuario })
const mapDispatchToProps = dispatch => bindActionCreators({ editar, buscarCliente }, dispatch)
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditProfile)))