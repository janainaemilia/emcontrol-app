import React from 'react'

import { Switch, Route, Redirect } from 'react-router'

import Explorar from '../components/explorar'
import AddClient from '../components/addClient'
import EditProfile from '../components/editProfile'
import AddManutencao from '../components/addManutencao'
import AddEquipament from '../components/addEquipament'
import ForgotPassword from '../components/forgotPassword'
import PageNotFound from '../common/template/pageNotFound'
import MeusEquipamentos from '../components/meusEquipamentos'
import EditarEquipamento from '../components/editarEquipamento'
import AvaliarEquipamento from '../components/avaliarEquipamento'
import ManutencaoList from '../components/manutencaoList'
import Manutencoes from '../components/manutencoes'

/**
 * Routes
 * @class
 * @memberof Main
 */
export default props => (
    <Switch>
        <Route exact path='/' render={() =>  <Explorar />} />
        <Route exact path='/forgot-password' render={() =>  <ForgotPassword />} />
        <Route exact path='/edit-profile' render={() =>  <EditProfile />} />
        <Route exact path='/new-client' render={() =>  <AddClient />} />
        <Route exact path='/new-equipament' render={() =>  <AddEquipament />} />
        <Route exact path='/editar-equipamento/:id' render={() =>  <EditarEquipamento />} />
        <Route exact path='/new-manutencao/:id' render={() =>  <AddManutencao />} />
        <Route exact path='/manutencoes/:id' render={() =>  <ManutencaoList />} />
        <Route exact path='/manutencoes' render={() =>  <Manutencoes />} />
        <Route exact path='/avaliar-equipamento/:id' render={() =>  <AvaliarEquipamento />} />
        <Route exact path='/meus-equipamentos' render={() =>  <MeusEquipamentos />} />
        <Route exact path='/explorar' render={() =>  <Explorar />} />
        <Route exact path='/page-not-found' render={() =>  <PageNotFound />} />
        <Redirect from='*' to='/page-not-found' />
    </Switch>
)