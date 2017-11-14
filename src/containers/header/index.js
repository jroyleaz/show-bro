import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SearchForm from '../search-form'
import SearchControls from '../search-controls'

const Header = props => (
  <div className="navbar-fixed responsive">
    <nav>
      <div className="nav-wrapper blue darken-2">
        <span className="responsive Search-Form-input left"><SearchForm /></span>
        <SearchControls />
        <ul className="right hide-on-med-and-down">
          <li>
            <Link
              className="Search-Controls-menu-item"
              to={`/search/${props.searchQuery}/sort/${props.sorting.sortBy}`}
            >
              Search
        </Link>
          </li>
          <li>
            <Link
              className="Search-Controls-menu-item"
              to={`/favorites/`}
            >
              Favorites
        </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
)

const mapStateToProps = state => ({
  searchQuery: state.search.searchQuery,
  sorting: state.search.searchSorting,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)