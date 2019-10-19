import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { addAvaliacao, getEquipamentos, getCategorias, getSubcategorias, salvarImagem, callEngine } from '../actions/equipamentoActions'

import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'

import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import If from '../common/operator/if'

import ModalWebCam from '../common/widget/ModalWebCam'
import CameraAlt from '@material-ui/icons/CameraAlt'
import CloudUpload from '@material-ui/icons/CloudUpload'

import Select from 'react-select'

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
        width: '100%',
        display: 'inline',   
    },
    card: {
        marginRight: theme.spacing.unit * 1,
        marginTop: 30,
        display: 'inline-block',
        marginLeft: '1%',
        width: '250px',
        height: '100%'
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '97%',
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
    filters: {
        clear: 'both',
        width: '100%',
        marginTop: '25px',
    },
    selectInput: {
        float: 'left',
        width: '47%',
        marginLeft: '13px',
        marginRight: '14px',
    }
  });

/**
 * Explorar
 * @class
 * @memberof Components
 */
class Explorar extends Component {
	constructor(props) {
        super(props)

        this.state = { list: [], expanded: false, categoria: null, subcategoria: null, subcategorias: [], placeholder: "Pesquisar...", modal: false, screenshot: null, nomeImagem: null }

        this.routeChange = this.routeChange.bind(this)
        this.handleCategoria = this.handleCategoria.bind(this)
        this.handleSubcategoria = this.handleSubcategoria.bind(this)
        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.showModal = this.showModal.bind(this)
        this.filter = this.filter.bind(this)
        this.filters = this.filters.bind(this)
        this.setScreenshot = this.setScreenshot.bind(this)
    }

    componentWillMount(){
        this.props.getEquipamentos()
        this.props.getCategorias()
        this.props.getSubcategorias()
    }

    componentWillReceiveProps(nextProps, nextstate){
        if(nextProps.equipamento.equipamentos.length > 0)
            this.setState({ list: nextProps.equipamento.equipamentos })
        
        if(nextProps.equipamento.readyToSearch)
            this.props.callEngine(this.state.nomeImagem)
    }

    handleExpandClick() {
        let state = this.state
        this.setState({ expanded: !state.expanded })
    }

    onSubmit(values) {
        this.props.add(values)
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
            if(item.categvalue != null){
                if(item.categvalue.id === obj.value)
                    list.push(item)
            }
        })

        this.setState({ subcategorias: list })
    }

    handleSubcategoria(obj){
        let state = this.state
        this.props.change('subcategoria', obj)
        this.setState({ ...state, subcategoria: obj })
    }
    
    renderReviews(){
        const { classes } = this.props
        
        let list = []
        let review = Math.floor(Math.random() * 5) + 1
        
        for (let i = 0; i < review; i++) 
            list.push(i)

        let result = list.map( item => (<IconButton key={item+99} aria-label="Add to favorites" className={classes.favButton}><FavoriteIcon /></IconButton>))
        let i = 5 - result.length

        for (let index = 0; index < i; index++) {
            result.push(<IconButton key={index} aria-label="Add to favorites" className={classes.favButtonGray}><FavoriteIcon /></IconButton>)
        }
        
        return result
        
    }

    filter(event){
        var updatedList = this.state.list || []

        if(event.target.value === ''){
            this.setState({ list: this.props.equipamento.equipamentos})
        }else{
            updatedList = updatedList.filter(function(item){
                return item.nome.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
                });
            this.setState({list: updatedList});
        }
    }

    filters(list){
        let updatedList = list
        let state = this.state

        if(this.state.categoria == null || this.state.categoria.label == "Todos"){
            return updatedList
        }else{
            updatedList = updatedList.filter(function(item){
                if(item.categoria.categoriaPai !== null){
                    return item.categoria.categoriaPai.nome.toLowerCase().search(state.categoria.label.toLowerCase()) !== -1 
                }else{
                    return item.categoria.nome.toLowerCase().search(
                        state.categoria.label.toLowerCase()) !== -1
                }
            })

            if(state.subcategoria != null){
                updatedList = updatedList.filter(function(item){
                    if(item.categoria.categoriaPai !== undefined){
                        return item.categoria.nome.toLowerCase().search(state.subcategoria.label.toLowerCase()) !== -1 
                    }
                })
            }

            return updatedList
        }
    }

    fileUpload(e){
        this.refs.fileUploader.click();
    }

    renderEquipaments() {
        const equipamentoList = this.state.list || []
        const { classes } = this.props

		return this.filters(equipamentoList).map(item => (
			<Card className={classes.card} key={item.id}>
                <CardHeader
                    avatar={ <Avatar aria-label="Recipe" className={classes.avatar}>{item.nome.split('')[0].toUpperCase()}</Avatar>}
                    action={ <IconButton><MoreVertIcon /></IconButton> }
                    title={item.nome}
                    subheader={item.anoFabricacao} />
                <CardMedia
                    className={classes.media}
                    image={'/images/'+item.imagem}
                    title={item.imagem} />
                <CardContent>
                    <Typography component="p">
                        <span className='text-bold'>Marca:</span> {item.marca}
                    </Typography>
                    <Typography component="p">
                        <span className='text-bold'>Modelo:</span> {item.modelo}
                    </Typography>
                    <If test={item.categoria.categoriaPai != null}>
                        <Typography component="p">
                            <span className='text-bold'>Categoria:</span> {(item.categoria.categoriaPai) ? item.categoria.categoriaPai.nome : '-'}
                        </Typography>
                        <Typography component="p">
                            <span className='text-bold'>Subcategoria:</span> {item.categoria.nome}
                        </Typography>
                    </If>
                    <If test={item.categoria.categoriaPai == null}>
                        <Typography component="p">
                            <span className='text-bold'>Categoria:</span> {item.categoria.nome}
                        </Typography>
                    </If>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    { this.renderReviews() }
                </CardActions>
            </Card>
		))
    }
    
    uploadFile(event){
        let nome = event.target.files[0].name
        this.setState({ placeholder: nome })
        this.props.callEngine(nome)
    }

    showModal(){
        let value = this.state.modal
        this.setState({ modal: !value })
    }

    setScreenshot(screenshot){
        let nome = "image"+Date.now()+'.jpg'

        let image = {
            nome: nome,
            url: screenshot,
            numeroPatrimonio: ''
        }
        this.props.salvarImagem(image)
        this.setState({ screenshot: screenshot })
        this.setState({ nomeImagem: nome})
    }

	/**
	 * 
	 */
	render() {
        const { classes } = this.props
        const { categoria, subcategoria, subcategorias } = this.state
        const {  categorias } = this.props.equipamento

        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">Explorar</Typography>
                        <Paper className={classes.root} elevation={1}>
                            <InputBase className={classes.input} placeholder={this.state.placeholder} onChange={this.filter} />
                            {this.state.screenshot ? <img alt="screenshot by user" src={this.state.screenshot} /> : null}
                            <IconButton className={classes.iconButton} aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                            
                            <IconButton className={classes.iconButton} aria-label="Search" onClick={this.showModal}>
                                <CameraAlt />
                            </IconButton>

                            <IconButton className={classes.iconButton} aria-label="Search">
                                <CloudUpload />
                                <input type='file'name='file' className={'custom-file-input'} onChange={this.uploadFile}/>
                            </IconButton>                            
                        </Paper>         
                        <div className={classes.filters}>
                            <Select 
                                className={classes.selectInput}
                                value={categoria}
                                onChange={this.handleCategoria}
                                onBlur={(e) => e.preventDefault()}
                                options={categorias}
                                placeholder={"Categoria"}
                            />
                            <Select 
                                className={classes.selectInput} 
                                value={subcategoria}
                                onChange={this.handleSubcategoria}
                                onBlur={(e) => e.preventDefault()}
                                options={subcategorias}
                                placeholder={"Subcategoria"}
                            />
                        </div>                       
                        <div className={classes.cards}>
                            {this.renderEquipaments()}
                        </div>
                    </Paper>
                    <If test={this.state.modal}>
                        <ModalWebCam showModal={() => this.showModal()} setScreenshot={this.setScreenshot}/>
                    </If>
                </main>
            </div>            
        )
	}
}

Explorar = reduxForm({form: 'ExplorarForm', destroyOnUnmount: false})(Explorar)
const mapStateToProps = state => ({ equipamento: state.equipamento })
const mapDispatchToProps = dispatch => bindActionCreators({ addAvaliacao, getEquipamentos, getCategorias, getSubcategorias, salvarImagem, callEngine }, dispatch)
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Explorar)))