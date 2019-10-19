import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { signup } from '../actions/usuarioActions'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Messages from '../common/msg/messages'
import CustomInput from '../common/form/input'
import SelectInput from '../common/form/selectInput'

import lightBlue from '@material-ui/core/colors/lightBlue'

import If from '../common/operator/if'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 1080,
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
      width: '100%',
      backgroundColor: '#07364c',
      display: 'flex',
      height: '-webkit-fill-available'
  },
  formGroup: {
      width: 310,
      float: 'left',
      marginRight: 30
  },
  type: {
      width: 100,
      display: 'block',
  },
  selectInput: {
    width: 250
  }
})

/**
 * EditProfile
 * @class
 * @memberof Auth
 */
class AddClient extends Component {
	constructor(props) {
        super(props)

        this.state = { type: { value: 1, label: 'Pessoa Física' }, sexo: { value: 1, label: 'Feminino' } }

        this.routeChange = this.routeChange.bind(this)
        this.handleType = this.handleType.bind(this)
        this.handleSexo = this.handleSexo.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        values['type'] = this.state.type
        values['sexo'] = this.state.sexo.label
        this.props.signup(values)
    }
    
    routeChange(route){
        this.props.history.push(route);
    }
	
    handleType(value){
        let state = this.state
        this.setState({ ...state, type: value })
    }

    handleSexo(value){
        let state = this.state
        this.setState({ ...state, sexo: value })
    }

	/**
	 * 
	 */
	render() {
        const { classes } = this.props
        const { handleSubmit } = this.props
        const { type, sexo } = this.state
        
        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <AccountCircleIcon className={classes.icon} />
                        </Avatar>
                        <Typography component="h1" variant="h5">Criar conta</Typography>
                        <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                            <Field 
                                label="Tipo"
                                name="type"
                                typeClass={classes.type}
                                selectClass={classes.selectInput}
                                component={SelectInput}
                                actualValue={type}
                                change={this.handleType}
                                options={[{value: 1, label: 'Pessoa Física'}, { value: 2, label: 'Pessoa Jurídica'}]} />                            
                            
                            <If test={type.value === 1}>                                
                                <FormGroup className={classes.formGroup}>
                                    <Field
                                        component={CustomInput}
                                        name='nome'
                                        label="Nome"
                                        ref='nome' />

                                    <Field
                                        component={CustomInput}
                                        name='data-nascimento'
                                        label="Data de Nascimento"
                                        type='date'
                                        ref='data-nascimento' />
                                    
                                    <FormControl margin="normal" required fullWidth className={classes.sexo}>
                                        <InputLabel htmlFor='sexo'>Sexo</InputLabel>
                                        <Field 
                                            name="sexo"
                                            classes={classes.selectInput}
                                            component={SelectInput}
                                            actualValue={sexo}
                                            change={this.handleSexo}
                                            options={[{value: 1, label: 'Feminino'}, { value: 2, label: 'Masculino'}, { value: 3, label: 'Outro'}]} />
                                    </FormControl>
                                    
                                    <Field
                                        component={CustomInput}
                                        name='cpf'
                                        label="CPF"
                                        type='number'
                                        ref='cpf' />
                                </FormGroup>
                            </If>
                            <If test={type.value === 2}>
                                <FormGroup className={classes.formGroup}>
                                    <Field
                                        component={CustomInput}
                                        name='nome'
                                        label="Nome"
                                        ref='nome' />
                                    <Field
                                        component={CustomInput}
                                        name='razao-social'
                                        label="Razão Social"
                                        ref='razao-social' />
                                    <Field
                                        component={CustomInput}
                                        name='cnpj'
                                        label="CNPJ"
                                        ref='cnpj' />                        
                                    <Field
                                        component={CustomInput}
                                        name='ramo'
                                        label="Ramo"
                                        ref='ramo' />
                                        <Field
                                        component={CustomInput}
                                        name='representante'
                                        label="Representante"
                                        ref='representante' />                                  
                                </FormGroup>
                            </If>

                            <FormGroup className={classes.formGroup}>
                                <Field
                                    component={CustomInput}
                                    name='cargo'
                                    label="Cargo"
                                    ref='cargo' />
                                <Field
                                    component={CustomInput}
                                    name='estado'
                                    label="Estado"
                                    ref='estado' />
                                <Field
                                    component={CustomInput}
                                    name='cidade'
                                    label="Cidade"
                                    ref='cidade' />
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
                            </FormGroup>

                            <FormGroup className={classes.formGroup}>
                                <Field
                                    component={CustomInput}
                                    name='email'
                                    label="E-mail"
                                    ref='email' />
                                <Field
                                    component={CustomInput}
                                    name='login'
                                    label="Login"
                                    ref='login' />
                                <Field
                                    component={CustomInput}
                                    name='senha'
                                    label="Senha"
                                    type='password'
                                    ref='senha' />
                            </FormGroup>

                            <FormControl fullWidth>
                                <InputLabel htmlFor="senha">Já é cadastrado?
                                    <a href="/" onClick={(event) => this.changePage(event, '/')}> Clique para entrar.</a>
                                </InputLabel>
                            </FormControl>
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                            >
                                Cadastrar
                            </Button>
                        </form>
                    </Paper>
                    <Messages />
                </main>
            </div>
        )
	}
}


AddClient = reduxForm({form: 'addClientForm', destroyOnUnmount: false})(AddClient)
const mapStateToProps = state => ({ usuario: state.usuario })
const mapDispatchToProps = dispatch => bindActionCreators({signup}, dispatch)
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddClient))