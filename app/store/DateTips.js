Ext.define('WebCare.store.DateTips', {
  extend: 'WebCare.store.Base',
  requires: ['WebCare.model.DateTips'],
  model: 'WebCare.model.DateTips',
  proxy: {
    url: 'ecg!restoreEcgNumber',
    type: 'ajax',
    reader: {
      type: 'json',
      root: 'value'
    }
  }
});