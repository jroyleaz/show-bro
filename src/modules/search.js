import Promise from 'bluebird'
import _ from 'lodash'

export const SEARCH_REQUESTED = 'search/SEARCH_REQUESTED'
export const SEARCH_COMPLETED = 'search/SEARCH_COMPLETED'
export const SEARCH_EMPTY = 'search/SEARCH_EMPTY'
export const SEARCH_SORTED = 'search/SEARCH_SORTED'
export const CACHE_USED = 'search/CACHE_USED'
export const UPDATE_SORTING = 'search/UPDATE_SORTING'
export const MISSING_IMAGE = '/no_image.png';


const initialState = {
  searchResults: [],
  searchQuery: '',
  isSearching: false,
  searchEmpty: false,
  sortedBy: 'relevance',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUESTED:
      return {
        ...state,
        searchQuery: action.payload,
        isSearching: true
      }

    case SEARCH_COMPLETED:
      return {
        ...state,
        isSearching: false,
        searchResults: {
          ...state.searchResults,
          [action.key]: action.payload,
        },
        searchEmpty: false,
      }
    case SEARCH_EMPTY:
      return {
        ...state,
        searchEmpty: true,
      }
    case SEARCH_SORTED:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          [action.key]: action.payload
        }
      }
    case UPDATE_SORTING:
      return {
        ...state,
        sortedBy: action.payload,
      }
    case CACHE_USED:
      return {
        ...state,
        isSearching: false,
      }
    default:
      return state
  }
}

export const search = (query) => {
  return (dispatch, getState) => {
    dispatch({
      type: SEARCH_REQUESTED,
      payload: query.trim(),
    })

    const state = getState();

    if (state.search.searchResults[state.search.searchQuery] &&
      state.search.searchResults[state.search.searchQuery].length > 0
    ) {
      return dispatch({
        type: CACHE_USED,
      })
    }

    return fetch(`http://api.tvmaze.com/search/shows?q=${query}`).then(response => {
      return response.json().then(data => {
        Promise.map(data, (d, i) => {
          let showData = {
            id: d.show.id,
            name: (d.show.name) ? d.show.name : 'Unknown',
            summary: stripHtml(d.show.summary),
            status: d.show.status,
            network: (d.show.network) ? d.show.network.name : 'Unknown',
            premiered: d.show.premiered,
            image: (d.show.image) ? d.show.image.medium : MISSING_IMAGE,
            rating: (d.show.rating) ? d.show.rating.average : '',
            airTime: `${d.show.schedule.days.join('s,')} at ${d.show.schedule.time}`,
            updated: d.show.updated,
            relevance: d.score,
            nextEpisode: {},
          };
          return showData;
        }).then(results => {

          if (results.length === 0) {
            return dispatch({
              type: SEARCH_EMPTY,
            })
          }
          const key = query.trim()

          return dispatch({
            type: SEARCH_COMPLETED,
            key: key,
            payload: results,
          });
        })
      });
    })
  }
}

export const sortBy = (sortName, accessor) => {
  return (dispatch, getState) => {
    const state = getState()
    const key = state.search.searchQuery
    const results = state.search.searchResults[key]
    const sorted = _.sortBy(results, (show) => {
      return _.get(show, accessor);
    })
    
    console.log('sorted', sorted);
    dispatch({
      type: UPDATE_SORTING,
      payload: sortName,
    })

    return dispatch({
      type: SEARCH_SORTED,
      key,
      payload: sorted,
    })
  }
}

const stripHtml = html => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  return tempDiv.textContent || tempDiv.innerText || ''
}