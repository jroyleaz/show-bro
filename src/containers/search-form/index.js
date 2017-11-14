import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'
import { search } from '../../modules/search'

const SearchForm = props => (
  <div className="input-field">
    <DebounceInput
      minLength={2}
      debounceTimeout={800}
      onChange={e => {
        props.search(e.target.value)
        props.changePage(e.target.value, props.sortedBy)
      }}
      id="show_search"
      type="text"
      className="validate"
      value={props.searchQuery}
    />
    <label htmlFor="show_search">Search for show...</label>
  </div>
)

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
  isSearching: state.search.isSearching,
  sortedBy: state.search.sortedBy,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  search,
  changePage: (query, sorter) => push(`/search/${query}/sort/${sorter}`)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)