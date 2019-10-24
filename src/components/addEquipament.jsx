import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { add, getCategorias, getSubcategorias, getNomes, saveToServer } from '../actions/equipamentoActions'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import CustomInput from '../common/form/input'
import SelectInput from '../common/form/selectInput'
import InputWithSuggestion from '../common/form/inputWithSuggestion'

import lightBlue from '@material-ui/core/colors/lightBlue'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormGroup from '@material-ui/core/FormGroup'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import If from '../common/operator/if'

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import { Link } from 'react-router-dom'

registerPlugin(FilePondPluginImagePreview);

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      marginTop: 80,
      [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 2,
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
      marginTop: '-8px',
    },
    submit: {
    //   marginTop: theme.spacing.unit * 3,
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
    },
    upload:{
        marginTop: '20px'
    },
    labelUpload: {
        marginTop: '-25px'
    }
  })

/**
 * AddEquipament
 * @class
 * @memberof Components
 */
class AddEquipament extends Component {
	constructor(props) {
        super(props)

        this.state = { categoria: null, subcategoria: null, nome: null, subcategorias: [], nomes: [], submit: false, dados: null, files: []}

        this.routeChange = this.routeChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleCategoria = this.handleCategoria.bind(this)
        this.handleSubcategoria = this.handleSubcategoria.bind(this)
        this.handleNome = this.handleNome.bind(this)
        this.changeNome = this.changeNome.bind(this)
        this.saveImages = this.saveImages.bind(this)
        this.getBase64 = this.getBase64.bind(this)
    }

    componentWillMount(){
        this.props.getCategorias()
        this.props.getSubcategorias()
        this.props.getNomes()
    }

    onSubmit(values) {
        values['nome'] = values['nome']
        this.props.add(values)
        this.setState({ ...this.state, dados: values, numeroPatrimonio: values['numero-serie'], submit: true })
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.equipamento != null && this.state.submit){
            this.saveImages()
            this.setState({ submit: false })
        }
    }

    saveImages(){
        let files = this.state.files
        let numeroPatrimonio = this.state.numeroPatrimonio

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
    
            props.saveToServer(data)
        }
    
        reader.onerror = function (error) {
          console.log('Error: ', error)
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
            if(item.categvalue.id === obj.value)
                list.push(item)
        })

        this.setState({ subcategorias: list })
    }

    handleSubcategoria(obj){
        let state = this.state
        this.props.change('subcategoria', obj)
        this.setState({ ...state, subcategoria: obj })
    }

    changeNome(nome){
        console.log(nome)
        this.props.change('nome', nome)
    }

    handleNome(obj){
        let state = this.state
        this.props.change('nome', obj)
        this.setState({ ...state, nome: obj })
    }
    
    handleFiles(files){
        this.setState({
            files: files.map(fileItem => fileItem.file)
        })
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
        const nomes = this.props.equipamento.nomes || []

        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">Cadastrar Equipamento</Typography>
                        <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                            <FormGroup className={classes.formGroup}>
                                <Field
                                    component={InputWithSuggestion}
                                    name='nome'
                                    label="Nome"
                                    placeholder="nome do equipamento"
                                    list={nomes}
                                    changeNome={this.changeNome}
                                    ref='nome' />
                               
                                {/* <Field
                                    label="Nome"
                                    name="nome"
                                    typeClass={classes.type}
                                    selectClass={classes.selectInput}
                                    component={SelectInput}
                                    actualValue={nome}
                                    change={this.handleNome}
                                    placeholder="Nome"
                                    options={nomes} /> */}

                                <Field
                                    label="Categoria"
                                    name="categoria"
                                    typeClass={classes.type}
                                    selectClass={classes.selectInput}
                                    component={SelectInput}
                                    actualValue={categoria}
                                    change={this.handleCategoria}
                                    placeholder="Selectione uma categoria"
                                    options={categorias} />

                                {/* <If test={(categoria != null && subcategorias.length > 0)}> */}
                                <If test={categoria != null}>    
                                    <Field 
                                        label="Subcategoria"
                                        name="subcategoria"
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
                                    name='modelo'
                                    label="Modelo"
                                    ref='modelo' />

                                <Field
                                    component={CustomInput}
                                    name='marca'
                                    label="Marca"
                                    ref='marca' />

                                <Field
                                    component={CustomInput}
                                    name='data-aquisicao'
                                    label="Data de Aquisição"
                                    type='date'
                                    ref='data-aquisicao' />
                                
                                <Field
                                    component={CustomInput}
                                    name='numero-serie'
                                    label="Número de Série"                                    
                                    ref='numero-serie' />

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
                            </FormGroup>
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                            >
                                Cadastrar
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

AddEquipament = reduxForm({form: 'addEquipamentForm', destroyOnUnmount: false})(AddEquipament)
const mapStateToProps = state => ({ equipamento: state.equipamento })
const mapDispatchToProps = dispatch => bindActionCreators({add, getCategorias, getSubcategorias, getNomes, saveToServer}, dispatch)
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddEquipament)))