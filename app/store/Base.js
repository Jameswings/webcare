Ext.define('WebCare.store.Base', {
  extend: 'Ext.data.Store',
  constructor: function(config){
    var me = this;
//    if (me.proxy && me.proxy.type == 'jsonp'){
    me.proxy.url = careServerUrl + me.proxy.url;
//    }
    this.callParent(arguments);
  }
});