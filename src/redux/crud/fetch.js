
const methodsWithBody = ['POST', 'PUT', 'PATCH'];

let cache = {};
let loading = {};

export default function({requestAction, updateCache, 
  successAction, failureAction, unauthorizedAction,
  method, url, params, json, 
  headers, responseType
  }) {
  return dispatch => {
    if (requestAction) {
      dispatch(requestAction(params));
    }

    const hasBody = methodsWithBody.indexOf(method) >= 0;

    let urlFinal = url;
    const paramKeys = params ? Object.keys(params) : [];

    if (!hasBody && paramKeys.length) {
      urlFinal += '?';
      paramKeys.forEach((paramKey, index) => {
        if (index) {
          urlFinal += '&';
        }

        urlFinal += paramKey + '=' + params[paramKey];
      });
    }

    if(methodsWithBody.indexOf(method) === -1 && cache[urlFinal]) { 
      if(updateCache) {
        dispatch(updateCache(cache[urlFinal]));
        dispatch(successAction(cache[urlFinal]));
        return null;
      }
    } 

    if(methodsWithBody.indexOf(method) === -1 && loading[urlFinal]) { 
      return null;
    }

    loading[urlFinal] = true;
    //console.log(hasBody,json,params);

    if(localStorage.getItem('id_token')) {
      headers['Authorization'] = 'JWT '+localStorage.getItem('id_token');
    }

    return fetch(urlFinal, {
      method,
      headers: headers,
      body: hasBody ? (json ? JSON.stringify(params) : params) : undefined,
    }).then(function(response) {
      if(response.status === 401) { 
        if(unauthorizedAction) { 
          dispatch(unauthorizedAction())
          return null;
        }
      }
      let responseTypeFinal = response[responseType] === 'function' ? responseType : 'json';

      const dataPromise = response[responseTypeFinal]();

      dataPromise.then(data => {
        if (response.ok) {
          if (successAction) {
            if(methodsWithBody.indexOf(method) !== -1 && loading[urlFinal]) { 
              loading[urlFinal] = false;
            }
           //   let obj = JSON.stringify(params);
           //   obj['_id'] = data.key;
            cache[urlFinal] = data;
            if(updateCache) {
              dispatch(updateCache(data));
            }
            dispatch(successAction(data));
          }
        }
        else if (failureAction) {
          dispatch(failureAction(data, response.statusText));
        }
      });

      return dataPromise;
    }).catch(function(error) {
      //console.log(error);
      if (failureAction) {
        dispatch(failureAction(null, error || 'Network error'));
      }

      return null;
    });
  };
}
