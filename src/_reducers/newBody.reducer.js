import { userConstants } from '../_constants';

export function newBody(state = {}, action) {
  switch (action.type) {
case userConstants.NEWREIM_REQUEST:
    return {
      sending: true,
      newids: action.newBody
    };
  case userConstants.NEWREIM_SUCCESS:
    return {
      sending: true,
    };
  case userConstants.NEWREIM_FAILURE:
    return { 
      error: action.error
    };
default:
  return state
}
}