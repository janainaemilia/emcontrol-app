import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { addAvaliacao, getCategorias, getSubcategorias, _buscarEquipamento } from '../actions/equipamentoActions'

import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import red from '@material-ui/core/colors/red'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import If from '../common/operator/if'
import axios from 'axios'
import consts from '../consts'

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
    card: {
      maxWidth: 400,
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      marginTop: 30,
      padding: 10,
    },
    submit: {
        marginBottom: 10,
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
      backgroundColor: red[500],
    },
    textarea: {
        width: 360,
        height: 110,
        padding: '5px 5px',
        border: 'none',
        boxShadow: '0px 0.5px 1px 1px #b4b4bb'
    }
  });

/**
 * AvaliarEquipament
 * @class
 * @memberof Components
 */
class AvaliarEquipament extends Component {
	constructor(props) {
        super(props)

        this.state = { expanded: false, categoria: null, subcategoria: null, equipamento: null, usuario: null, images: [], avaliacao: null, nota: 0 }

        this.onReview = this.onReview.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.routeChange = this.routeChange.bind(this)
        this.renderReviews = this.renderReviews.bind(this)
        this.onReviewHandle = this.onReviewHandle.bind(this)
        this.handleCategoria = this.handleCategoria.bind(this)
        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.handleSubcategoria = this.handleSubcategoria.bind(this)
    }

    componentWillMount(){
        this.props.getCategorias()
        this.props.getSubcategorias()

        let id = this.props.match.params.id

        this.props._buscarEquipamento(id)
    }

    componentWillReceiveProps(nextProps, nextState){
        if(nextProps.equipamento.equipamento != null){
            let equipamento = nextProps.equipamento.equipamento.equipamento
            let usuario = nextProps.equipamento.equipamento.usuario
            this.setState({ equipamento: equipamento })
            this.setState({ usuario: usuario })
            this.renderImages(equipamento)      
        }            
    }

    renderImages(equipamento){
        axios.get(`${consts.API_URL}/imagens/${equipamento.id}`)
            .then(resp => {
                if(resp != null){
                    this.setState({ images: resp.data })
                }                
            })
            .catch(e => {
                console.log(e)
            })
    }

    handleExpandClick() {
        let state = this.state
        this.setState({ expanded: !state.expanded })
    }

    routeChange(route){
        this.props.history.push(route);
    }
	
    handleCategoria(value){
        let state = this.state
        this.setState({ ...state, categoria: value })
    }

    handleSubcategoria(value){
        let state = this.state
        this.setState({ ...state, subcategoria: value })
    }
    
    renderReviews(nota){
        const { classes } = this.props

        let result = []

        if(nota > 0){
            for (let i = 1; i <= nota; i++)
            result.push(<IconButton key={i} onClick={() => this.onReview(i)} aria-label="Add to favorites" className={classes.favButton}><FavoriteIcon /></IconButton>)   
        }
        
        for (let index = nota+1; index <= 5; index++)
            result.push(<IconButton key={index} onClick={() => this.onReview(index)} aria-label="Add to favorites" className={classes.favButtonGray}><FavoriteIcon /></IconButton>)   
        
        return result
    }

    onReview(nota){
        this.setState({ nota: nota })
        this.renderReviews(nota)
    }

    onReviewHandle(e){
        let value = e.target.value
        this.setState({ avaliacao: value })
    }

    onSubmit(){
        let data = {
            equipamento: this.state.equipamento,
            usuario: this.state.usuario,
            nota: this.state.nota,
            avaliacao: this.state.avaliacao
        }
    
        this.props.addAvaliacao(data)
    }

	/**
	 * 
	 */
	render() {
        const { classes } = this.props
        const equipamento = this.state.equipamento

        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                    <CssBaseline />
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h5">Avaliar Equipamento</Typography>
                            <Card className={classes.card}>
                                <If test={equipamento != null}>
                                    <CardHeader
                                        avatar={ <Avatar aria-label="Recipe" className={classes.avatar}>{(equipamento) ? equipamento.nome.split('')[0].toUpperCase() : ''}</Avatar>}
                                        title={(equipamento) ? equipamento.nome : ''}
                                        className={classes.cardHeader}
                                        subheader={(equipamento) ? equipamento.anoFabricacao : ''} />
                                    <CardMedia
                                        className={classes.media}
                                        image={(equipamento) ? '/images/' + equipamento.imagem : ''}
                                        title={(equipamento) ? equipamento.nome : ''}
                                    />
                                    <CardContent>
                                    <textarea className={classes.textarea} onChange={(e) => this.onReviewHandle(e)} defaultValue='Faça um comentário..'></textarea>
                                    </CardContent>
                                    <CardActions className={classes.actions} disableActionSpacing>
                                        { this.renderReviews(this.state.nota) }
                                    </CardActions>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        onClick={this.onSubmit}
                                        className={classes.submit}
                                    >
                                        Cadastrar
                                    </Button>
                                </If>
                                <Link to={'/meus-equipamentos'}>
                                    <Button type="button" variant="outlined" color="primary" className={classes.button}>Voltar</Button>
                                </Link>            
                            </Card>
                        </Paper>                    
                </main>
            </div>            
        )
	}
}

AvaliarEquipament = reduxForm({form: 'avaliarEquipamentForm', destroyOnUnmount: false})(AvaliarEquipament)
const mapStateToProps = state => ({ equipamento: state.equipamento })
const mapDispatchToProps = dispatch => bindActionCreators({addAvaliacao, getCategorias, getSubcategorias, _buscarEquipamento}, dispatch)
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AvaliarEquipament)))