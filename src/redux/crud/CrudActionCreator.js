import fetchAdapter from './fetch.js';

const defaultSettings = {
  adapter: fetchAdapter,
  primaryKey: '_id',
  actionTypesSuffixPlural: undefined,
  json: false,
  headers: {},
  getters: {},
  unauthorizedAction: () => ({ type:'LOGIN_REQUIRED' }),
  responseType: undefined,
};

const ERROR_SUFFIX = '_ERROR';

export default class CrudActionCreator {
  constructor(url, actionTypesSuffix, settings = {}) {
    this.url = url;
    this.primaryKey = settings.primaryKey || defaultSettings.primaryKey;
    this.json = settings.json;
    this.adapter = settings.adapter || defaultSettings.adapter;
    this.headers = settings.headers || defaultSettings.headers;
    this.getters = settings.getters || defaultSettings.getters;
    this.responseType = settings.responseType || defaultSettings.responseType;
    this.unauthorizedAction = settings.unauthorizedAction || defaultSettings.unauthorizedAction;
    this.additionalAdapterSettings = settings.additionalAdapterSettings;

    const actionTypesSuffixPl =
      settings.actionTypesSuffixPlural || actionTypesSuffix + 'S';

    this.actionTypes = {
      request: 'REQUEST_' + actionTypesSuffixPl,
      receive: 'RECEIVED_' + actionTypesSuffixPl,
      receiveError: 'RECEIVED_' + actionTypesSuffixPl + ERROR_SUFFIX,
      saving: 'SAVING_' + actionTypesSuffix,
      saved: 'SAVED_' + actionTypesSuffix,
      saveError: 'SAVE_' + actionTypesSuffix + ERROR_SUFFIX,
      requestOne: 'REQUEST_' + actionTypesSuffix,
      receiveOne: 'RECEIVED_' + actionTypesSuffix,
      receiveOneError: 'RECEIVED_' + actionTypesSuffix + ERROR_SUFFIX,
      deleting: 'DELETING_' + actionTypesSuffix,
      deleted: 'DELETED_' + actionTypesSuffix,
      deleteError: 'DELETE_' + actionTypesSuffix + ERROR_SUFFIX,
      updateCache: 'UPDATE_CACHE_'+actionTypesSuffix,
    };

    this.requestList = this.requestList.bind(this);
    this.receiveListError = this.receiveListError.bind(this);
    this.saving = this.saving.bind(this);
    this.saved = this.saved.bind(this);
    this.saveError = this.saveError.bind(this);
    this.receiveList = this.receiveList.bind(this)
    this.deleting = this.deleting.bind(this);
    this.deleted = this.deleted.bind(this);
    this.deleteError = this.deleteError.bind(this);
    this.requestOne = this.requestOne.bind(this);
    this.receiveOne = this.receiveOne.bind(this);
    this.receiveOneError = this.receiveOneError.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }

  _getHeaders() {
    if (typeof this.headers === 'object') {
      return this.headers;
    }

    if (typeof this.headers === 'function') {
      return this.headers();
    }

    return {};
  }

  requestList(params) {
    return {
      type: this.actionTypes.request,
      params,
    };
  }

  receiveList(params, data) {
    return {
      type: this.actionTypes.receive,
      data: this.getters.getList ? this.getters.getList(data) : data,
      params,
    };
  }

  receiveListError(params, data, error) {
    return {
      type: this.actionTypes.receiveError,
      data,
      error,
      params,
    };
  }

  fetchList(params,method) {
    return this.adapter({
      url: this.url+'/query',
      params,
      method:method || 'POST',
      json: this.json,
      headers: this._getHeaders(),
      unauthorizedAction: this.unauthorizedAction,
      requestAction: this.requestList,
      successAction: this.receiveList.bind(null, params),
      failureAction: this.receiveListError.bind(null, params),
      ...this.additionalAdapterSettings,
    });
  }

  saving(id) {
    return {
      type: this.actionTypes.saving,
      id,
    };
  }

  saved(id, data) {
    return {
      type: this.actionTypes.saved,
      data,
      id,
    };
  }

  saveError(id, data, error) {
    return {
      type: this.actionTypes.saveError,
      id,
      data,
      error,
    };
  }

  save(data, id, method) {
    if (id) {
      data[this.primaryKey] = id;
    }

    return this.adapter({
      url: id ? this.url + '/data/' + id : this.url + '/data',
      params: data,
      method: method || (id ? 'PUT' : 'POST'),
      json: this.json,
      headers: this._getHeaders(),
      updateCache: this.updateCache.bind(null,id),
      requestAction: this.saving,
      successAction: this.saved.bind(null, id),
      failureAction: this.saveError.bind(null, id),
      ...this.additionalAdapterSettings,
    });
  }

  requestOne(id) {
    return {
      type: this.actionTypes.requestOne,
      id,
    };
  }

  receiveOne(id, data) {
    return {
      type: this.actionTypes.receiveOne,
      id,
      data: this.getters.getOne ? this.getters.getOne(data) : data,
    };
  }

  receiveOneError(id, data, error) {
    return {
      type: this.actionTypes.receiveOneError,
      id,
      error,
      data,
    };
  }

  updateCache(id,data) {
    return {
      type: this.actionTypes.updateCache,
      id,
      data
    }
  }

  fetchOne(id) {
    return this.adapter({
      url: this.url + '/data/' + id,
      headers: this._getHeaders,
      updateCache: this.updateCache.bind(null,id),
      requestAction: this.requestOne.bind(null,id),
      successAction: this.receiveOne.bind(null, id),
      failureAction: this.receiveOneError.bind(null, id),
      ...this.additionalAdapterSettings,
    });
  }

  deleting(id) {
    return {
      type: this.actionTypes.deleting,
      id,
    };
  }

  deleted(id, data) {
    return {
      type: this.actionTypes.deleted,
      data,
      id,
    };
  }

  deleteError(id, data, error) {
    return {
      type: this.actionTypes.deleteError,
      data,
      error,
      id,
    };
  }

  delete(id) {
    return this.adapter({
      url: this.url + '/data/' + id,
      method: 'DELETE',
      headers: this._getHeaders,
      requestAction: this.deleting,
      successAction: this.deleted.bind(null, id),
      failureAction: this.deleteError.bind(null, id),
      ...this.additionalAdapterSettings,
    });
  }
}
