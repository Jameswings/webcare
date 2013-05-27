Ext.define('WebCare.store.Base', {
  extend: 'Ext.data.Store',
  careServerUrl: '../care_server/json/',
  constructor: function(config){
    var me = this;
//    if (me.proxy && me.proxy.type == 'jsonp'){
    me.proxy.url = this.careServerUrl + me.proxy.url;
//    }
    this.callParent(arguments);
  }
});