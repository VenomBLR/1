import { userConstants } from '../_constants';

export function upReim(state = {}, action) {
  switch (action.type) {
case userConstants.NEWREIM_REQUEST:
    return {
      sending: true,
      upids: action.upReim
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