import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'

import { addAvaliacao, getEquipamentosByUser, getCategorias, getSubcategorias, updateMeusEquipamentosList } from '../actions/equipamentoActions'

import { withStyles } from '@material-ui/core/styles'

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
import FavoriteIcon from '@material-ui/icons/Favorite'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import CssBaseline from '@material-ui/core/CssBaseline'

import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import If from '../common/operator/if'
import axios from 'axios'
import consts from '../consts'

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
      maxWidth: '250px',
      height: '100%'
    },
    searchArea: {
        width: '98%'
    },
    link: {
        float: 'right',
        width: '13%',
        marginTop: 20,
        marginRight: 20,
    },
    buttonLink:{
        height: 45
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '82%',
        marginTop: 20,
        float: 'left'
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
    bold: {
        fontWeigth: 600,
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
 * MeusEquipamentos
 * @class
 * @memberof Components
 */
class MeusEquipamentos extends Component {
	constructor(props) {
        super(props)

        this.state = { expanded: false, categoria: null, subcategoria: null, review: 0, meusEquipamentos: [], images: [] }

        this.routeChange = this.routeChange.bind(this)
        this.handleCategoria = this.handleCategoria.bind(this)
        this.handleSubcategoria = this.handleSubcategoria.bind(this)
        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.renderEquipaments = this.renderEquipaments.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.renderReviews = this.renderReviews.bind(this)
        this.fetchImages = this.fetchImages.bind(this)
        this.filters = this.filters.bind(this)
    }
    
    componentWillMount(){
        this.props.getEquipamentosByUser(this.props.auth.usuario)
        this.props.getCategorias()
        this.props.getSubcategorias()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.equipamento.meusEquipamentos != null){
            this.setState({ meusEquipamentos: nextProps.equipamento.meusEquipamentos })
            this.fetchImages(nextProps.equipamento.meusEquipamentos)
        }
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

    fetchImages(list){
        list.forEach(equipamento => {
            let id = equipamento.equipamento.id
            let images = this.state.images

            axios.get(`${consts.API_URL}/imagens/${id}`)
                .then(resp => {
                    if(resp != null){
                        images.push({ id: id, images: resp.data })
                        this.setState({ images: images})
                    }                
                })
                .catch(e => {
                    console.log(e)
                })  
        })
    }

    renderEquipaments() {
        const equipamentoList = this.state.meusEquipamentos || []
        const { classes } = this.props

		return this.filters(equipamentoList).map(item => (
            <Card className={classes.card} key={item.equipamento.id}>
                <CardHeader
                    avatar={ <Avatar aria-label="Recipe" className={classes.avatar}>{item.equipamento.nome.split('')[0].toUpperCase()}</Avatar>}
                    action={ <IconButton><MoreVertIcon /></IconButton> }
                    title={item.equipamento.nome}
                    className={classes.cardHeader}
                    subheader={item.equipamento.anoFabricacao} />
                
                <CardMedia className={classes.media} image={'/images/'+item.equipamento.imagem} title={item.equipamento.imagem} />

                <CardContent>
                    <Typography component="p">
                        <span className='text-bold'>Marca:</span> {item.equipamento.marca}
                    </Typography>
                    <Typography component="p">
                        <span className='text-bold'>Modelo:</span> {item.equipamento.modelo}
                    </Typography>
                    <If test={item.equipamento.categoria.categoriaPai != null}>
                        <Typography component="p">
                            <span className='text-bold'>Categoria:</span> {(item.equipamento.categoria.categoriaPai) ? item.equipamento.categoria.categoriaPai.nome : '-'}
                        </Typography>
                        <Typography component="p">
                            <span className='text-bold'>Subcategoria:</span> {item.equipamento.categoria.nome}
                        </Typography>
                    </If>
                    <If test={item.equipamento.categoria.categoriaPai == null}>
                        <Typography component="p">
                            <span className='text-bold'>Categoria:</span> {item.equipamento.categoria.nome}
                        </Typography>
                    </If>
                </CardContent>
                <CardContent className={classes.cardButtons}>
                    <Link to={`/editar-equipamento/${item.equipamento.id}`}>
                        <Button type="button" fullWidth variant="outlined"
                                color="primary" className={classes.button}>
                                Editar
                        </Button>
                    </Link>
                    <Link to={`/avaliar-equipamento/${item.equipamento.id}`}>
                        <Button type="button" fullWidth variant="outlined"
                                color="primary" className={classes.button}>
                                Avaliar
                        </Button>
                    </Link>
                    <Link to={`/manutencoes/${item.equipamento.id}`}>
                        <Button type="button" fullWidth variant="outlined"
                                color="primary" className={classes.button}>
                                Manutenções
                        </Button>
                    </Link>
                </CardContent>                      
            </Card>
        ))
	}
    
    filter(event){
        var updatedList = this.state.meusEquipamentos

        if(event.target.value === ''){
            this.setState({ meusEquipamentos: this.props.equipamento.meusEquipamentos})
        }else{
            updatedList = updatedList.filter(function(item){
                return item.equipamento.nome.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1
                });
            this.setState({meusEquipamentos: updatedList})
        }
    }

    filters(list){
        let updatedList = list
        let state = this.state

        if(this.state.categoria == null || this.state.categoria.label == "Todos"){
            return updatedList
        }else{
            updatedList = updatedList.filter(function(item){
                if(item.equipamento.categoria.categoriaPai !== null){
                    return item.equipamento.categoria.categoriaPai.nome.toLowerCase().search(state.categoria.label.toLowerCase()) !== -1 
                }else{
                    return item.equipamento.categoria.nome.toLowerCase().search(
                        state.categoria.label.toLowerCase()) !== -1
                }
            })

            if(state.subcategoria != null){
                updatedList = updatedList.filter(function(item){
                    if(item.equipamento.categoria.categoriaPai !== undefined){
                        return item.equipamento.categoria.nome.toLowerCase().search(state.subcategoria.label.toLowerCase()) !== -1 
                    }
                })
            }

            return updatedList
        }
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
                        <Typography component="h1" variant="h5">Meus Equipamentos</Typography>
                        <div className={classes.searchArea}>
                            <Link to={'/new-equipament'} className={classes.link}>
                                <Button type="button" fullWidth variant="outlined"
                                        color="primary" className={classes.buttonLink}>
                                        Add Equipamento
                                </Button>
                            </Link>
                            <Paper className={classes.root} elevation={1}>
                                <InputBase onChange={(event) => this.filter(event)} className={classes.input} placeholder="Pesquisar.." />
                                <IconButton className={classes.iconButton} aria-label="Search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </div>
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
                </main>
            </div>            
        )
	}
}

MeusEquipamentos = reduxForm({form: 'MeusEquipamentosForm', destroyOnUnmount: false})(MeusEquipamentos)
const mapStateToProps = state => ({ equipamento: state.equipamento, auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({addAvaliacao, getEquipamentosByUser, getCategorias, getSubcategorias, updateMeusEquipamentosList}, dispatch)
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MeusEquipamentos)))