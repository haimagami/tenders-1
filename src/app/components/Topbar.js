import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Topbar.scss'
import {translate} from 'react-polyglot'
import {inject, observer} from 'mobx-react'
import {clearCache} from 'common/services/apiService'
import FoundationHelper from 'lib/FoundationHelper'

const req = require.context('common/style/icons/', false)
const logoSrc = req('./logo.png')
const navIconSrc = req('./nav_icon.svg')
const userSrc = req('./user.svg')

const navbar = [  {
  title: 'subscriptions',
  link: '/subscriptions'
}, {
  title: 'contactus',
  link: '/contact'
}, {
  title: 'publish',
  link: '/publish'
}]

@translate()
@inject('translationsStore')
@inject('routingStore')
@inject('accountStore')
@CSSModules(styles, { allowMultiple: true })
@observer //note if class is not an observer, it will not be affected from changes in other classes observables...
export default class Topbar extends Component {

  componentWillMount() {
    //console.log('mount')
  }

  componentWillReceiveProps(nextProps) {
    //console.log('receive')
  }

  navigate = route => () => {
    const { routingStore: { push, location: { pathname: path } } } = this.props
    if (path !== route) {
      push(route)
    }
  }

  login = () => {
    //temp implementation - login assistant
    const {accountStore} = this.props
    if (!accountStore.profile) {
      accountStore.login('r314g', 'r314g', true)
      clearCache()
      this.navigate('/')
      /* //not working. :(
      setTimeout(() => {
        //allow element to be created.
        //console.log('init')
        FoundationHelper.initElement('top_nav')
      }, 200)*/
    }
  }

  logout = () => {
    const {accountStore} = this.props
    accountStore.logout()
    clearCache()
    this.navigate('/')
  }

  render() {
    const {accountStore, t} = this.props
    const loginLabel = accountStore.profile ? decodeURIComponent(accountStore.profile.contactName) : t('nav.pleaseLog')
    return (
      <div styleName="header">
        <nav className="column row">
          <div className="top-bar" styleName="top-bar">
            <div className="top-bar-right">
              <a onClick={this.navigate('/')}>
                <img src={logoSrc} alt={t('nav.logoAlt')} id="logo" />
              </a>
            </div>

            <div className="top-bar-left" styleName="top-bar-left" style={{position: 'relative'}}>
              <div styleName="nav_icon_container" data-responsive-toggle="top_nav" data-hide-for="medium">
                <button type="button" data-toggle="top_nav"><img src={navIconSrc} alt="" /></button>
              </div>
              <ul className="dropdown vertical medium-horizontal menu" styleName="menu" id="top_nav" data-dropdown-menu>
                {navbar.map((nav, index) =>
                  <li key={index}><a onClick={this.navigate(`${nav.link}`)}>{t(`nav.${nav.title}`)}</a></li>
                ) }
                <li styleName="">
                  <a onClick={this.login}><img src={userSrc} alt="" />{loginLabel}</a>
                  {accountStore.profile &&
                  <ul id="logout" className="submenu menu vertical" styleName="menu" data-dropdown-menu>
                    <li><a onClick={this.logout}>{t('nav.logout')}</a></li>
                  </ul>}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
