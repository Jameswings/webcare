Ext.define('WebCare.store.EcgInfo', {
  extend: 'WebCare.store.Base',
  requires: ['WebCare.model.EcgInfo'],
  model: 'WebCare.model.EcgInfo'
//  ,
//  proxy: {
//    url: 'ecg!getEcgList',
//    type: 'jsonp',
//    reader: {
//      type: 'json',
//      root: 'value'
//    }
//  }
});