Ext.define('WebCare.store.CustomerInfo', {
  extend: 'WebCare.store.Base',
  requires: ['WebCare.model.CustomerInfo'],
  model: 'WebCare.model.CustomerInfo',
  proxy: {
    url: 'ecg!getEcgList',
    type: 'jsonp',
    reader: {
      type: 'json',
      root: 'value'
    }
  }
});