import React from 'react'
import { push } from 'react-router-redux'
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortBy } from '../../modules/search'

const sorters = [
  {
    title: 'relevance',
    accessor: 'relevance',
  },
  {
    title: 'name',
    accessor: 'name',
  },
  {
    title: 'status',
    accessor: 'status',
  },
  {
    title: 'rating',
    accessor: 'rating',
  },
  {
    title: 'network',
    accessor: 'network',
  },
  {
    title: 'recent',
    accessor: 'updated',
  },
  {
    title: 'premiered',
    accessor: 'premiered',
  },
]

const SearchControls = props => (
    (props.searchResults &&
    props.searchResults[props.searchQuery] &&
    props.searchResults[props.searchQuery].length > 0) &&
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        {sorters.map(sorter => {
          return (<li className={(sorter.title === props.sortedBy) ? "active disabled" : ""} key={sorter.title}>
            <Link
              className="Search-Controls-menu-item"
              to={`/search/${props.searchQuery}/sort/${sorter.title}`}
              onClick={() => props.sortBy(sorter.title, sorter.accessor)}
            >
              {sorter.title}
            </Link>
          </li>)
        })}
      </ul>
      || null
)

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
  isSearching: state.search.isSearching,
  searchResults: state.search.searchResults,
  sortedBy: state.search.sortedBy,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  sortBy: (sortName, accessor) => sortBy(sortName, accessor),
  changePage: (query) => push(`/search/${query}`)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchControls)