import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProgressiveImage from 'react-progressive-image'
import { search } from '../../modules/search'
import NoResults from '../no-results'
import './search-results.css'

const SearchResults = props => {
  if (props.match.params.query && !props.searchQuery) {
    props.search(props.match.params.query);
  }
  return (
    <div>
      {props.isSearching &&
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      }
      {(props.searchResults &&
        props.searchResults[props.searchQuery] &&
        props.searchResults[props.searchQuery].length > 0) &&
        <div className="Search-Results-result-box row">
          {props.searchResults[props.searchQuery].map((data) => (
            <div key={data.id} >
                <div className="card card-small Search-Results-show-box">
                  <div className="card-image">
                    <ProgressiveImage src={data.image} placeholder='/loading.gif'>
                      {(src) => <img src={src} alt={data.name} />}
                    </ProgressiveImage>
                  </div>
                  <div className="card-action">
                    {data.name}
                  </div>
                </div>
            </div>
          ))}
        </div>
      }
      {props.searchEmpty && <NoResults />}
    </div>
  )
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