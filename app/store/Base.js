Ext.define('WebCare.store.Base', {
  extend: 'Ext.data.Store',
  careServerUrl: 'http://localhost:8080/care_server/jsonp/',
  constructor: function(config){
    var me = this;
    if (me.proxy && me.proxy.type == 'jsonp'){
      me.proxy.url = this.careServerUrl + me.proxy.url;
    }
    this.callParent(arguments);
  }
});