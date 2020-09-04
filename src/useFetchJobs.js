import React, {useReducer, useEffect} from 'react';
import axios from 'axios';

const actions = {
    makeRequest: 'make-request',
    getData: 'get-data',
    error: 'error'
}

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

function reducer(state, action) {
 switch (action.type) {
     case actions.makeRequest:
        return {loading: true, jobs: []}
     case actions.getData:
        return {...state, loading: false, jobs: action.payload.jobs}
     case actions.error:
        return {...state, loading: false, error: action.payload.error, jobs: []}
     default: 
        return state;
 }
}

const useFetchJobs = (params, page) => {
    const [state, dispatch] = useReducer(reducer, {jobs: [], load: true});

    useEffect(() => {
        dispatch({type: actions.makeRequest})
        axios.get(baseUrl, {
            params: {markdown: true, page: page, ...params}
        })
        .then(res => {
            dispatch({type: actions.getData, payload: {jobs: res.data}})
        })
        . catch(e => {
            dispatch({type: actions.error, payload: {error: e}})
        })
    }, [params, page])

    return state
}

export default useFetchJobs; //16:00