import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'

import { getManutencaoEquipamento } from '../actions/manutencaoActions'
import { buscarEquipamento } from '../actions/equipamentoActions'

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

import MoreVertIcon from '@material-ui/icons/MoreVert'

import CssBaseline from '@material-ui/core/CssBaseline'

import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import If from '../common/operator/if'

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
      clear: 'both',
      marginRight: theme.spacing.unit * 3,
      marginTop: 30,
      float: 'left',
      marginLeft: '2%',
      minWidth: '250px',
    //   height: '410px'
      height: '100%',
      width: '17%'
    },
    cardManutencao: {
      float: 'left',
      marginRight: theme.spacing.unit * 3,
      marginTop: 30,
      marginLeft: '2%',
      minWidth: '250px',
    //   height: '410px'
      height: '100%'
    },
    manutencoes:{
        float:'left',
        width: '78% '
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
        width: '90%',
        margin: '0px 0px 15px 12px',
    },
    buttonBack: {
        float: 'left',
        marginTop: 10,
        marginLeft: 10, 
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
    }
  });

/**
 * ManutencaoList
 * @class
 * @memberof Components
 */
class ManutencaoList extends Component {
	constructor(props) {
        super(props)

        this.state = { expanded: false, categoria: null, subcategoria: null, review: 0, meusEquipamentos: null, images: [] }

        this.routeChange = this.routeChange.bind(this)
        this.handleCategoria = this.handleCategoria.bind(this)
        this.handleSubcategoria = this.handleSubcategoria.bind(this)
        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.renderManutencoes = this.renderManutencoes.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    componentWillMount(){
        let id = this.props.match.params.id
        this.props.getManutencaoEquipamento(id)
        this.props.buscarEquipamento(id)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.manutencao.manutencoes != null){
            this.setState({ manutencoes: nextProps.manutencao.manutencoes })
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
	
    handleCategoria(value){
        let state = this.state
        this.setState({ ...state, categoria: value })
    }

    handleSubcategoria(value){
        let state = this.state
        this.setState({ ...state, subcategoria: value })
    }

    renderManutencoes() {
        const manutencaoList = this.state.manutencoes || []
        const { classes } = this.props

		return manutencaoList.map(item => (
            <Card className={classes.cardManutencao} key={item.id}>
                <CardContent>                   
                    <Typography component="p">
                        Tipo de Serviço: {item.tipoSerico}
                    </Typography>
                    <Typography component="p">
                        Descrição: {item.descricao}
                    </Typography>
                    <Typography component="p">
                        Data: {item.data}
                    </Typography>
                    <Typography component="p">
                        Valor: {item.valor}
                    </Typography>
                    <Typography component="p">
                        Provedor do Serviço: {item.provedorServico}
                    </Typography>
                    <Typography component="p">
                        Garantia: {item.garantia}
                    </Typography>
                    <Typography component="p">
                        Prpevisão: {item.previsao}
                    </Typography>
                </CardContent>
            </Card>
        ))
	}

	/**
	 * 
	 */
	render() {
        const { classes } = this.props
        const equipamento = this.props.equipamento.equipamento

        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">Manutenções do Equipamento #{(equipamento) ? equipamento.equipamento.id : 0}</Typography>
                        <Paper className={classes.root} elevation={1}>
                            <InputBase onChange={(event) => this.filter(event)} className={classes.input} placeholder="Pesquisar.." />
                            <IconButton className={classes.iconButton} aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>                        
                        <div className={classes.cards}>
                        <Link to={'/meus-equipamentos'}>
                            <Button type="button" variant="outlined" color="primary" className={classes.buttonBack}>Voltar</Button>
                        </Link> 
                            <Card className={classes.card}>
                                <CardHeader
                                        avatar={ <Avatar aria-label="Recipe" className={classes.avatar}>{(equipamento) ? equipamento.equipamento.nome.split('')[0].toUpperCase() : ''}</Avatar>}
                                        action={ <IconButton><MoreVertIcon /></IconButton> }
                                        title={(equipamento) ? equipamento.equipamento.nome : ''}
                                        className={classes.cardHeader}
                                        subheader={(equipamento) ? equipamento.equipamento.anoFabricacao : ''} />
                                    
                                <CardMedia className={classes.media} image={'/images/'+((equipamento) ? equipamento.equipamento.imagem : '')} title={(equipamento) ? equipamento.equipamento.imagem : ''} />

                                <CardContent>
                                    <Typography component="p">
                                        Marca: {(equipamento) ? equipamento.equipamento.marca : ''}
                                    </Typography>
                                    <Typography component="p">
                                        Modelo: {(equipamento) ? equipamento.equipamento.modelo : ''}
                                    </Typography>
                                    <If test={equipamento != null}>
                                            <Typography component="p">
                                                Categoria: {(equipamento) ? equipamento.equipamento.categoria.categoriaPai.nome : '-'}
                                            </Typography>
                                            <Typography component="p">
                                                Subcategoria: {(equipamento) ? equipamento.equipamento.categoria.nome : ''}
                                            </Typography>
                                    </If>
                                    <If test={equipamento == null}>
                                        <Typography component="p">
                                            Categoria: {(equipamento) ? equipamento.equipamento.categoria.nome : ''}
                                        </Typography>
                                    </If>
                                </CardContent> 
                                <Link to={`/new-manutencao/${(equipamento) ? equipamento.equipamento.id : ''}`}>
                                    <Button type="button" fullWidth variant="outlined"
                                            color="primary" className={classes.button}>
                                            Novo
                                    </Button>
                                </Link>
                            </Card>
                            <div className={classes.manutencoes}>
                                {this.renderManutencoes()}                            
                            </div>
                        </div>                        
                    </Paper>
                </main>
            </div>            
        )
	}
}

ManutencaoList = reduxForm({form: 'ManutencaoListForm', destroyOnUnmount: false})(ManutencaoList)
const mapStateToProps = state => ({ manutencao: state.manutencao, equipamento: state.equipamento, auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ getManutencaoEquipamento, buscarEquipamento }, dispatch)
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ManutencaoList)))