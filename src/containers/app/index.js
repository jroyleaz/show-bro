import React from 'react';
import { Route, Link } from 'react-router-dom'
import Header from '../header'
import SearchForm from '../search-form'
import SearchResults from '../search-results'

const App = () => (
  <div>
    <Header />

    <div className="container">
      <main>
        {/* <Route path="/search" component={SearchForm} /> */}
        <Route path="/search/:query" component={SearchResults} />
      </main>
    </div>
  </div>
)

export default App
