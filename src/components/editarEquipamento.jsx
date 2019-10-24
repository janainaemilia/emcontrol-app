import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { editar, getCategorias, getSubcategorias, buscarEquipamento, saveToServer } from '../actions/equipamentoActions'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import CssBaseline from '@material-ui/core/CssBaseline'
import FormGroup from '@material-ui/core/FormGroup'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import CustomInput from '../common/form/input'
import SelectInput from '../common/form/selectInput'

import If from '../common/operator/if'

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
 * EditarEquipamento
 * @class
 * @memberof Components
 */
class EditarEquipamento extends Component {
	constructor(props) {
        super(props)

        this.state = { categoria: null, subcategoria: null, subcategorias: [], equipamento: null, numeroPatrimonio: null, dados: null }

        this.routeChange = this.routeChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleCategoria = this.handleCategoria.bind(this)
        this.handleSubcategoria = this.handleSubcategoria.bind(this)
    }

    componentWillMount(){
        this.props.getCategorias()
        this.props.getSubcategorias()

        let id = this.props.match.params.id

        this.props.buscarEquipamento(id)
    }

    onSubmit(values) {
        this.setState({ ...this.state, dados: values, numeroPatrimonio: values.numeroPatrimonio })
        this.props.editar(values)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.equipamento != null && nextProps.submitSucceeded){            
            console.log(nextProps.equipamento.equipamento.numeroPatrimonio)
            this.saveImages(nextProps.equipamento.equipamento.numeroPatrimonio)
            this.setState({ submit: false })
        }
    }
    
    routeChange(route){
        this.props.history.push(route);
    }
	
    handleCategoria(obj){
        this.props.change('categoria', obj)
        this.setState({ categoria: obj })

        this.setState({ subcategorias: [] })
        
        let subcategorias = this.props.equipamento.subcategorias
        let list = []

        subcategorias.forEach(item => {
            if(item.value === obj.value)
                list.push(item)
        })

        this.setState({ subcategorias: list })
    }

    handleSubcategoria(obj){
        let state = this.state
        this.props.change('subcategoria', obj)
        this.setState({ ...state, subcategoria: obj })
    }
    
    handleFiles(files){
        this.setState({
            files: files.map(fileItem => fileItem.file)
        })
    }

    saveImages(numeroPatrimonio){
        let files = this.state.files
        console.log("numeroPatrimonio", numeroPatrimonio)

        files.forEach(file => {
            this.getBase64(file, numeroPatrimonio)
        })
    }
    
    getBase64(file, numeroPatrimonio) {
        let props = this.props
        let date = new Date()
        
        var reader = new FileReader()
        reader.readAsDataURL(file)
    
        reader.onload = function () {
            let base64 = reader.result
            let name = date.valueOf();
            name = name + "." + file.name.split('.')[1]
    
            let data = [{ url: base64, nome: name, numeroPatrimonio: numeroPatrimonio }]
            console.log(data)

            props.saveToServer(data)
        }
    
        reader.onerror = function (error) {
          console.log('Error: ', error)
        }
    }

	/**
	 * 
	 */
	render() {
        const { classes } = this.props
        const { handleSubmit } = this.props
        const { categoria, subcategoria } = this.state

        const categorias = this.props.equipamento.categorias
        const subcategorias = this.state.subcategorias

        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">Editar Equipamento</Typography>
                        <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                            <FormGroup className={classes.formGroup}>
                                <Field
                                    component={CustomInput}
                                    name='equipamento.nome'
                                    label="Nome"
                                    ref='nome' />
                            
                                <Field
                                    label="Categoria"
                                    name="equipamento.categoria"
                                    typeClass={classes.type}
                                    selectClass={classes.selectInput}
                                    component={SelectInput}
                                    actualValue={categoria}
                                    change={this.handleCategoria}
                                    placeholder="Selectione uma categoria"
                                    options={categorias} />

                                <If test={categoria != null}>
                                    <Field 
                                        label="Subcategoria"
                                        name="equipamento.subcategoria"
                                        typeClass={classes.type}
                                        selectClass={classes.selectInput}
                                        component={SelectInput}
                                        actualValue={subcategoria}
                                        change={this.handleSubcategoria}
                                        placeholder="Selectione uma Subcategoria"
                                        options={subcategorias} />
                                </If>                                
                            
                                <Field
                                    component={CustomInput}
                                    name='equipamento.modelo'
                                    label="Modelo"
                                    ref='modelo' />

                                <Field
                                    component={CustomInput}
                                    name='equipamento.marca'
                                    label="Marca"
                                    ref='marca' />

                                <Field
                                    component={CustomInput}
                                    name='dataAquisicao'
                                    label="Data de Aquisição"
                                    type='date'
                                    ref='data-aquisicao' />
                                
                                <Field
                                    component={CustomInput}
                                    name='numeroPatrimonio'
                                    label="Número de Série"
                                    type='number'
                                    ref='numeroPatrimonio' />
                            </FormGroup>
                            
                            <FormControl margin="normal" required={true} fullWidth >
                                    <InputLabel htmlFor={'fileupload'} className={classes.labelUpload}>Imagens</InputLabel>
                                    <FilePond
                                        ref={ref => (this.pond = ref)}
                                        files={this.state.files}
                                        allowMultiple={true}
                                        maxFiles={5}
                                        className={classes.upload}
                                        onupdatefiles={(fileItems) => this.handleFiles(fileItems) }
                                    />
                                </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                            >
                                Salvar Alterações
                            </Button>
                            <Link to={'/meus-equipamentos'}>
                                <Button type="button" variant="outlined" color="primary" className={classes.button}>Voltar</Button>
                            </Link>
                        </form>
                    </Paper>
                </main>
            </div>            
        )
	}
}

EditarEquipamento = reduxForm({form: 'EditarEquipamentoForm', destroyOnUnmount: false})(EditarEquipamento)
const mapStateToProps = state => ({ equipamento: state.equipamento })
const mapDispatchToProps = dispatch => bindActionCreators({editar, getCategorias, getSubcategorias, buscarEquipamento, saveToServer}, dispatch)
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditarEquipamento)))