import axios from 'axios';

export const fetchOrganizations = () => {
    return async (dispatch) => {
        dispatch({type: 'FETCH_ORGANIZATIONS_START'});
        try {
            const response = await axios.get('/api/organizations/find_organization');
            dispatch({type: 'FETCH_ORGANIZATIONS_SUCCESS', payload: response.data});
        } catch (err) {
            dispatch({type: 'FETCH_ORGANIZATIONS_ERROR', payload: err});
        }
    }
};