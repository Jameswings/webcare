Ext.define('WebCare.store.DateTips', {
  extend: 'WebCare.store.Base',
  requires: ['WebCare.model.DateTips'],
  model: 'WebCare.model.DateTips',
  proxy: {
    url: 'ecg!restoreEcgNumber',
    type: 'jsonp',
    reader: {
      type: 'json',
      root: 'value'
    }
  }
});