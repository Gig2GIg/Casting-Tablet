import inflection from 'inflection';
import BaseService from './core/BaseService';

const getApiResourceName = Symbol('getApiResourceName');
const getPrimaryKey = Symbol('getPrimaryKey');

export default class Service extends BaseService {
  /**
   * @type {string}
   */
  apiResource = this[getApiResourceName]();

  /**
   * @type {string}
   */
  primarykey = 'id';

  /**
   * Display the current resource.
   *
   * @param {object} config
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  all(config = null) {
    return this.get('', config);
  }

  /**
   * Alias for all.
   *
   * @param {object} config
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  fetch(config = null) {
    return this.all(config);
  }

  /**
   * Display the specified resource.
   *
   * @param {object|number} resource
   * @param {object} config
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  show(resource, config = null) {
    return this.get(`/${this[getPrimaryKey](resource)}`, config);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param {object} resource
   * @param {object} config
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  store(resource, config = null) {
    return super.post('', resource, config);
  }

  /**
   * Alias for store.
   *
   * @param {object} resource
   * @param {object} config
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  create(resource, config = null) {
    return this.store(resource, config);
  }

  /**
   * Update the current resource in storage.
   *
   * @param {object} resource
   * @param {boolean} ignorePrimaryKey
   * @param {object} config
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  update(resource, ignorePrimaryKey = false, config = null) {
    const url = ignorePrimaryKey ? '' : `/${this[getPrimaryKey](resource)}`;
    return super[ignorePrimaryKey ? 'post' : 'put'](url, resource, config);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param {object} resource
   * @param {object} config
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  destroy(resource, config = null) {
    return super.delete(`/${this[getPrimaryKey](resource)}`, config);
  }

  /**
   * Alias for destroy.
   *
   * @param {object} resource
   * @param {object} config
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  delete(resource, config = null) {
    return this.destroy(resource, config);
  }

  /**
   * Get the API Resource name from class name.
   *
   * @returns {*|PromiseLike<T | never>|Promise<T | never>}
   */
  [getApiResourceName]() {
    return `/${inflection.pluralize(this.constructor.name.replace('Service', '').toLowerCase())}`;
  }

  /**
   * Get the primary key of resource.
   *
   * @param {object} resource
   * @returns {string}
   */
  [getPrimaryKey](resource) {
    if (typeof resource === 'object') {
      return resource[this.primarykey];
    }
    return String(resource);
  }
}
