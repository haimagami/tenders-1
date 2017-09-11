import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import styles from './search.scss'

@CSSModules(styles)
export default class Search extends Component {

  componentWillMount = () => {
    console.log('search component')
  }

  render() {
    return (
      <div style={{marginTop: '50px'}}>
        Search - Component
      </div>
    )
  }
}
