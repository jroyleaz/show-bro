import React from 'react';
import { Route, Link } from 'react-router-dom'
import SearchForm from '../search-form'
import SearchResults from '../search-results'

const App = () => (
  <div className="container">
    <header className="h3">
      <Link to="/search">Search</Link>
      <i className="material-icons left">accessibility</i>
    </header>

    <main>
      <Route path="/search" component={SearchForm} />
      <Route exact path="/search/:query" component={SearchResults} />
    </main>
  </div>
)

export default App
