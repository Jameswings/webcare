Ext.define('WebCare.store.EcgInfo', {
  extend: 'WebCare.store.Base',
  requires: ['WebCare.model.EcgInfo'],
  model: 'WebCare.model.EcgInfo',
  groupField: 'customerId',
  sorters: [{
    property: 'creationTime',
    direction: 'DESC'
  }],
  proxy: {
    url: 'ecg!getEcgList',
    type: 'ajax',
    reader: {
      type: 'json',
      root: 'value'
    }
  }
});