Ext.define('WebCare.store.CustomerInfo', {
  extend: 'WebCare.store.Base',
  requires: ['WebCare.model.CustomerInfo'],
  model: 'WebCare.model.CustomerInfo',
  proxy: {
    url: 'customer!getCustomerList',
    type: 'jsonp',
    reader: {
      type: 'json',
      root: 'value'
    }
  }
});