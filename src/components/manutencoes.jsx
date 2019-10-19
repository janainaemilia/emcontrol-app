import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'

import { getManutencoesByUser,getManutencoesByUser2, getManutencoes } from '../actions/manutencaoActions'
import { buscarEquipamento } from '../actions/equipamentoActions'

import { withStyles } from '@material-ui/core/styles'
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
    divManutencao:{
        width: '100%',
        clear: 'both',
        background: '#5f6b750d',
        height: '355px',
        marginBottom: '55px',
        marginTop: '30px',
        borderRadius: '7px',
        borderBottom: '3px solid #10536bc4'
    },
    manutencoes:{
        float:'right',
        width: '70% '
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
      marginRight: theme.spacing.unit * 3,
      marginTop: 30,
      display: 'inline-block',
      marginLeft: '2%',
      minWidth: '250px',
    //   height: '410px'
    //   height: '100%',
      float: 'left'
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

        this.state = { expanded: false, categoria: null, subcategoria: null, review: 0, meusEquipamentos: [], manutencoes: [] }

        this.routeChange = this.routeChange.bind(this)
        this.handleCategoria = this.handleCategoria.bind(this)
        this.handleSubcategoria = this.handleSubcategoria.bind(this)
        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.renderManutencoes = this.renderManutencoes.bind(this)
        this.renderManutencoesItens = this.renderManutencoesItens.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.filter = this.filter.bind(this)
    }
    
    componentWillMount(){
        this.props.getManutencoesByUser(this.props.auth.usuario)
        // this.props.getManutencoesByUser2(this.props.auth.usuario)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.manutencao.manutencoesUsuario != null){
            this.setState({ meusEquipamentos: nextProps.manutencao.manutencoesUsuario })
        }

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

    renderManutencoes(){
        const { classes } = this.props
        
        return (this.state.meusEquipamentos).map((equipamentoUsuario)=> (            
            <If test={equipamentoUsuario.manutencoes.length > 0} key={equipamentoUsuario.id}>
                <div className={classes.divManutencao} key={equipamentoUsuario.id}>
                <Card className={classes.card} key={equipamentoUsuario.id}>
                    <CardHeader
                            avatar={ <Avatar aria-label="Recipe" className={classes.avatar}>{equipamentoUsuario.equipamento.nome.split('')[0].toUpperCase()}</Avatar>}
                            action={ <IconButton><MoreVertIcon /></IconButton> }
                            title={equipamentoUsuario.equipamento.nome}
                            className={classes.cardHeader}
                            subheader={equipamentoUsuario.equipamento.anoFabricacao} />
                    <CardMedia className={classes.media} image={'/images/'+(equipamentoUsuario.equipamento.imagem)} title={equipamentoUsuario.equipamento.imagem} />
                    <CardContent>    
                        <Typography component="p">
                            <span className='text-bold'>Marca:</span> {equipamentoUsuario.equipamento.marca}
                        </Typography>
                        <Typography component="p">
                            <span className='text-bold'>Modelo:</span> {equipamentoUsuario.equipamento.modelo}
                        </Typography>
                        <If test={equipamentoUsuario.equipamento.categoria.categoriaPai != null}>
                            <Typography component="p">
                                <span className='text-bold'>Categoria:</span> {(equipamentoUsuario.equipamento.categoria.categoriaPai) ? equipamentoUsuario.equipamento.categoria.categoriaPai.nome : ''}
                            </Typography>
                            <Typography component="p">
                                <span className='text-bold'>Subcategoria:</span> {equipamentoUsuario.equipamento.categoria.nome}
                            </Typography>
                        </If>
                        <If test={equipamentoUsuario.equipamento.categoria.categoriaPai == null}>
                            <Typography component="p">
                                <span className='text-bold'>Categoria:</span> {equipamentoUsuario.equipamento.categoria.nome}
                            </Typography>
                        </If>     
                    </CardContent>
                </Card>
                <div className={classes.manutencoes}>
                    {this.renderManutencoesItens(equipamentoUsuario.manutencoes)}                            
                </div>
                </div>
            </If>
        ))
    }

    renderManutencoesItens(manutencaoList) {
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
    
    filter(event){
        var updatedList = this.state.meusEquipamentos

        if(event.target.value === ''){
            this.setState({ meusEquipamentos: this.props.manutencao.manutencoesUsuario})
        }else{
            updatedList = updatedList.filter(function(item){
                return item.equipamento.nome.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1
                });
            this.setState({meusEquipamentos: updatedList})
        }
    }

	/**
	 * 
	 */
	render() {
        const { classes } = this.props

        return (
            <div className={classes.bgPage}>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">Manutenções</Typography>
                        <Paper className={classes.root} elevation={1}>
                            <InputBase onChange={(event) => this.filter(event)} className={classes.input} placeholder="Pesquisar.." />
                            <IconButton className={classes.iconButton} aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>                                            
                        <div className={classes.cards}>
                            <If test={this.state.meusEquipamentos === []}>
                                <p>Nenhuma manutenção cadastrada</p>
                            </If>                           
                            {this.renderManutencoes()}
                        </div>                   
                    </Paper>
                </main>
            </div>            
        )
	}
}

ManutencaoList = reduxForm({form: 'ManutencaoListForm', destroyOnUnmount: false})(ManutencaoList)
const mapStateToProps = state => ({ manutencao: state.manutencao, equipamento: state.equipamento, auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ getManutencoesByUser,getManutencoesByUser2, buscarEquipamento, getManutencoes }, dispatch)
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ManutencaoList)))