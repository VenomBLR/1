import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
      case userConstants.GETBYID_REQUEST:
        return {
          loading: true
        };
      case userConstants.GETBYID_SUCCESS:
        return {
          items: action.users
        };
      case userConstants.GETBYID_FAILURE:
        return { 
          error: action.error
        };
      case userConstants.UPDATEUSER_REQUEST:
        return {
          sending: true,
          items: action.users
        };
      case userConstants.UPDATEUSER_SUCCESS:
        return {
          sending: true,
          items: action.users
        };
      case userConstants.UPDATEUSER_FAILURE:
        return { 
          error: action.error
        };
      case userConstants.NEWUSER_REQUEST:
        return {
          sending: true,
          items: action.users
        };
      case userConstants.NEWUSER_SUCCESS:
        return {
          sending: true,
          items: action.users
        };
      case userConstants.NEWUSER_FAILURE:
        return { 
          error: action.error
        };
    default:
      return state
  }
}