import constants from '../constants'
import { APIManager } from '../utils'

const postData = (path, data, actionType) => {
  return (dispatch) => APIManager
    .handlePost(path, data)
    .then(response => {
      if (actionType != null) {
        dispatch({
          type: actionType,
          data: response.results || response.result
        })
      }

      return response
    })
    .catch(err => {
      throw err
    })
}

const getData = (path, params, actionType) => {
  return (dispatch) => APIManager
    .handleGet(path, params)
    .then(response => {
      if (actionType != null) {
        dispatch({
          type: actionType,
          data: response.results || response.result
        })
      }

      return response
    })
    .catch(err => {
      throw err
    })
}

// const putData = (path, data, actionType) => {
//   return (dispatch) => APIManager
//     .handlePut(path, data)
//     .then(response => {
//       if (actionType != null) {
//         dispatch({
//           type: actionType,
//           data: response.results || response.result
//         })
//       }

//       return response
//     })
//     .catch(err => {
//       throw err
//     })
// }

const deleteData = (path, actionType) => {
  return (dispatch) => APIManager
    .handleDelete(path)
    .then(response => {
      if (actionType != null) {
        dispatch({
          type: actionType,
          data: response.results || response.result || null
        })
      }

      return response
    })
    .catch(err => {
      throw err
    })
}

const actions = {
  
  fetchAttributes: (params) => {
    return dispatch => {
      return dispatch(getData('http://localhost:9000/api/attribute', params, constants.ATTRIBUTES_RECEIVED))
    }
  },
  
  createAttribute: (params) => {
    return dispatch => {
      return dispatch(postData('http://localhost:9000/api/attribute', params, constants.ATTRIBUTE_CREATED))
    }
  },

  updateAttribute: (/*data*/params) => {
    return dispatch => {
      //return dispatch(putData('http://localhost:9000/api/attribute', data, constants.ATTRIBUTE_UPDATED))
      return dispatch(postData('http://localhost:9000/api/attribute/update', params, constants.ATTRIBUTE_UPDATED))
    }
  },

  deleteAttribute: (/*data*/params) => {
    return dispatch => {
      return dispatch(deleteData('http://localhost:9000/api/attribute/delete', params, constants.ATTRIBUTE_DELETED))
    }
  },

  fetchValues: (params) => {
    return dispatch => {
      return dispatch(getData('http://localhost:9000/api/value', params, constants.VALUES_RECEIVED))
    }
  },
  
  createValue: (params) => {
    return dispatch => {
      return dispatch(postData('http://localhost:9000/api/value', params, constants.VALUE_CREATED))
    }
  },

  updateValue: (/*data*/params) => {
    return dispatch => {
      //return dispatch(putData('http://localhost:9000/api/value', data, constants.ATTRIBUTE_UPDATED))
      return dispatch(postData('http://localhost:9000/api/value/update', params, constants.VALUE_UPDATED))
    }
  },

  deleteValue: (/*data*/params) => {
    return dispatch => {
      return dispatch(deleteData('http://localhost:9000/api/value/delete', params, constants.VALUE_DELETED))
    }
  }
}

export default actions