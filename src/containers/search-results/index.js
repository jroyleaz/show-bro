import React, { Component } from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import $ from 'jquery'
import ProgressiveImage from 'react-progressive-image'
import { search } from '../../modules/search'
import NoResults from '../no-results'
import SearchControls from '../search-controls'
import './search-results.css'

class SearchResults extends Component {
  constructor () {
    super()
  }
  componentDidMount() {
    $(document).ready(function() {
       console.log('refs', this.refs)
    })
  }

  render () {
    if (this.props.match.params.query && !this.props.searchQuery) {
      this.props.search(this.props.match.params.query);
    }
    return (
      <div>
        {this.props.isSearching &&
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        }
        
        {(this.props.searchResults &&
          this.props.searchResults[this.props.searchQuery] &&
          this.props.searchResults[this.props.searchQuery].length > 0) &&
          <ul ref="searchResults" className="collapsible" data-collapsible="accordion">
            {this.props.searchResults[this.props.searchQuery].map((data) => {
              let statusIcon
              switch (data.status.toLowerCase()) {
                case 'running':
                  statusIcon = 'tv'
                  break
                case 'ended':
                  statusIcon = 'block'
                  break
                default:
                  statusIcon = 'warning'
              }
              return (
                <li key={data.id}>
                  <div className="collapsible-header">
                    {(data.status === 'Running' &&
                      <img src={data.image} alt={data.name} className="Search-Results-show-img circle responsive-img" />
                    ) || <i className="material-icons">{statusIcon}</i>}
                    {data.name}
                  </div>
                  <div className="collapsible-body"><span>{data.summary}</span></div>
              </li>
              )
            })
            }
          </ul>    
        }
        {this.props.searchEmpty && <NoResults />}
      </div>
    )
  }
}

SearchResults.propTypes = {
  searchQuery: PropTypes.string,
  searchResults: PropTypes.object,
  isSearching: PropTypes.bool,
  searchEmpty: PropTypes.bool,
}

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
  searchResults: state.search.searchResults,
  isSearching: state.search.isSearching,
  searchEmpty: state.search.searchEmpty,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults)