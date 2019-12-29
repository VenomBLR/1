import { userConstants } from '../_constants';

export function reims(state = {}, action) {
  switch (action.type) {
      case userConstants.GETREIMBYID_REQUEST:
        return {
          loading: true
        };
      case userConstants.GETREIMBYID_SUCCESS:
        return {
          ids: action.reims
        };
      case userConstants.GETREIMBYID_FAILURE:
        return { 
          error: action.error
        };
      case userConstants.UPDATEREIM_REQUEST:
        return {
          sending: true,
          ids: action.reims
        };
      case userConstants.UPDATEREIM_SUCCESS:
        return {
          sending: true,
          ids: action.reims
        };
      case userConstants.UPDATEREIM_FAILURE:
        return { 
          error: action.error
        };
      case userConstants.GETBYSTATUS_REQUEST:
        return {
          loading: true
        };
      case userConstants.GETBYSTATUS_SUCCESS:
        return {
          ids: action.reims
        };
      case userConstants.GETBYSTATUS_FAILURE:
        return { 
          error: action.error
        };
    default:
      return state
  }
}