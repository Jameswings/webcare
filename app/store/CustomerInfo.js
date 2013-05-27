Ext.define('WebCare.store.CustomerInfo', {
  extend: 'WebCare.store.Base',
  requires: ['WebCare.model.CustomerInfo'],
  model: 'WebCare.model.CustomerInfo',
  proxy: {
    url: 'customer!getCustomerInfo',
    type: 'ajax',
    reader: {
      type: 'json',
      root: 'value'
    }
  }
});