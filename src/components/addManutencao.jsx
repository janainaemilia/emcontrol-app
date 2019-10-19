import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

import { add, buscarTipoServico } from '../actions/manutencaoActions'
import { buscarEquipamento } from '../actions/equipamentoActions'

import { withStyles } from '@material-ui/core/styles'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import FormGroup from '@material-ui/core/FormGroup'

import CssBaseline from '@material-ui/core/CssBaseline'

import If from '../common/operator/if'

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import CustomInput from '../common/form/input'
import SelectInput from '../common/form/selectInput'
import LabelAndTextArea from '../common/form/labelAndTextArea'

registerPlugin(FilePondPluginImagePreview);

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: 100,
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
          width: '94%',
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
    cards: {
        width: '290px',
        float: 'left',   
    },
    card: {
      marginRight: theme.spacing.unit * 3,
      marginTop: 30,
      float: 'left',
      marginLeft: '2%',
      minWidth: '250px',
    //   height: '410px'
      height: '100%'
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '98%',
        marginTop: 20,
      },
    input: {
        marginLeft: 8,
        flex: 1,
        fontSize: 12
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      backgroundSize: 'auto 100%'
    },
    actions: {
      display: 'flex',
    },
    cardButtons: {
        marginTop: '-20px'
    },
    favButton: {
        padding: '3px',
        marginTop: '-13px',
        color: '#9e0d48' 
    },
    favButtonGray: {
        padding: '3px',
        marginTop: '-13px',
        color: '#e0cfd6'
    },
    button: {
        marginTop: '10px'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: '#10536b',
    },
    cardHeader: {
      width: "250px"
    },
    divForm: {
        width: '100%'
    },
    form: {
        float: 'left',
        'min-width': '75%',
    },
    type: {
        width: '100%',
        display: 'block',
    },
    selectInput: {
      marginTop: 50
    }
  })

/**
 * ManutencaoList
 * @class
 * @memberof Components
 */
class ManutencaoList extends Component {
	constructor(props) {
        super(props)

        this.state = { expanded: false, equipamento: null, tipoServicoList: null, tipoServico: null, visible: false }

        this.routeChange = this.routeChange.bind(this)
        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.handleFiles = this.handleFiles.bind(this)
        this.handleTipoServico = this.handleTipoServico.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    componentWillMount(){
        let id = this.props.match.params.id
        this.props.buscarEquipamento(id)
        this.props.buscarTipoServico()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.equipamento.equipamento != null){
            this.setState({ equipamento: nextProps.equipamento.equipamento })
        }

        if(nextProps.manutencao.tipoServicoList != null){
            this.setState({ tipoServicoList: nextProps.manutencao.tipoServicoList })
        }
    }

    handleExpandClick() {
        let state = this.state
        this.setState({ expanded: !state.expanded })
    }

    onSubmit(values) {
        values['equipamentoUsuario'] = this.state.equipamento
        this.props.add(values)
    }
    
    routeChange(route){
        this.props.history.push(route);
    }
	
    handleFiles(files){
        let reader  = new FileReader()
        let props = this.props

        reader.onloadend = function () {
            let value = reader.result
            props.change('notaFiscal', value)
        }

        reader.readAsDataURL(files[0].file)
    }

    handleTipoServico(obj){
        this.props.change('tipoServico', obj)
        this.setState({ tipoServico: obj })
    }

	/**
	 * 
	 */
	render() {
        const { classes } = this.props
        const { handleSubmit } = this.props
        const { equipamento, tipoServico } = this.state
        const tipoServicoList = this.props.manutencao.tipoServicoList

        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">Cadastrar Manutenção</Typography>
                        <div className={classes.divForm}>
                            <div className={classes.cards}>
                                <Card className={classes.card} key={(equipamento) ? equipamento.equipamento.id : ''}>
                                    <CardHeader
                                        avatar={ <Avatar aria-label="Recipe" className={classes.avatar}>{(equipamento) ? equipamento.equipamento.nome.split('')[0].toUpperCase() : ''}</Avatar>}
                                        action={ <IconButton><MoreVertIcon /></IconButton> }
                                        title={(equipamento) ? equipamento.equipamento.nome : ''}
                                        className={classes.cardHeader}
                                        subheader={(equipamento) ? equipamento.equipamento.anoFabricacao : ''} />
                                    
                                    <CardMedia className={classes.media} image={(equipamento) ? '/images/'+equipamento.equipamento.imagem : ''} title={(equipamento) ? equipamento.equipamento.imagem : ''} />

                                    <CardContent>
                                        <Typography component="p">
                                            Marca: {(equipamento) ? equipamento.equipamento.marca : ''}
                                        </Typography>
                                        <Typography component="p">
                                            Modelo: {(equipamento) ? equipamento.equipamento.modelo : ''}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Link to={`/manutencoes/${(equipamento) ?equipamento.equipamento.id : -1}`}>
                                    <Button type="button" variant="outlined" color="primary" className={classes.button}>Voltar</Button>
                                </Link>
                            </div>

                            <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                                <FormGroup className={classes.formGroup}>
                                    <Field
                                        label="Tipo de Serviço"
                                        name="tipoServico"
                                        typeClass={classes.type}
                                        selectClass={classes.selectInput}
                                        component={SelectInput}
                                        actualValue={tipoServico}
                                        change={this.handleTipoServico}
                                        placeholder="Selectione uma tipo de serviço"
                                        options={tipoServicoList} />

                                    <Field
                                        component={LabelAndTextArea}
                                        name='descricao'
                                        label="Descrição"
                                        ref='descricao' />

                                    <Field
                                        component={CustomInput}
                                        name='data'
                                        label="Data"
                                        type='date'
                                        ref='data' />
                                    
                                    <Field
                                        component={CustomInput}
                                        name='valor'
                                        label="Valor"
                                        type='number'
                                        ref='valor' />

                                    <Field
                                        component={CustomInput}
                                        name='provedorServico'
                                        label="Provedor do Serviço"
                                        ref='provedorServico' />

                                    <Field
                                        component={CustomInput}
                                        name='garantia'
                                        label="Garantia (mêses)"
                                        type='number'
                                        ref='garantia' />

                                    <Field
                                        component={CustomInput}
                                        name='previsao'
                                        label="Previsão"
                                        type='date'
                                        ref='previsao' />

                                    <FormControl margin="normal" required fullWidth >
                                        <InputLabel htmlFor={'file'}>Nota Fiscal</InputLabel>
                                        <FilePond
                                            ref={ref => (this.pond = ref)}
                                            files={this.state.files}
                                            allowMultiple={true}
                                            maxFiles={1}
                                            onupdatefiles={(fileItems) => this.handleFiles(fileItems) } />
                                    </FormControl>

                                    <If test={this.state.visible}>
                                        <Field
                                            component={CustomInput}
                                            name='notaFiscal'
                                            label="Nota Fiscal"
                                            ref='notaFiscal' />
                                    </If>
                                </FormGroup>
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    className={classes.submit}>
                                    Cadastrar
                                </Button>
                            </form>
                        </div>                        
                    </Paper>
                </main>
            </div>            
        )
	}
}

ManutencaoList = reduxForm({form: 'ManutencaoListForm', destroyOnUnmount: false})(ManutencaoList)
const mapStateToProps = state => ({ equipamento: state.equipamento, auth: state.auth, manutencao: state.manutencao })
const mapDispatchToProps = dispatch => bindActionCreators({add, buscarEquipamento, buscarTipoServico }, dispatch)
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ManutencaoList)))