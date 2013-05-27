Ext.define('WebCare.controller.Customer', {
  extend: 'Ext.app.Controller',
  stores: ['CustomerInfo'],
  refs: [
    {
      ref: 'customerView',
      selector: 'customerView'
    }
  ],
  init: function(){
      this.control({
        'customerView': {
          afterrender: this.onListShow
        },
        'customerView checkcolumn': {
          checkchange: this.changeCustomerMonitored
        }
      });
  },
  onLaunch: function() {
//    var dateTipsStore = this.getDateTipsStore();
//    dateTipsStore.load({
//      callback: this.onDateTipsLoad,
//      scope: this
//    });
  },
  onListShow: function(){
    var me = this;
    var cv = me.getCustomerView();
    cv.store.load();
  },
  changeCustomerMonitored: function(){
    var me = this;
    var store = me.getCustomerInfoStore();
    var customerView = me.getCustomerView();
    var updatedRecord = store.getUpdatedRecords();
    if (updatedRecord.length > 0){
      var datar = [];
      Ext.each(updatedRecord, function(r, index){
        datar[index] = r.data;
      });

      var params = {customerList: datar};

      customerView.setLoading(true);
      window.params = params;
      console.log(params);

      Ext.data.JsonP.request({
        url: careServerUrl + 'jsonp/customer!saveCustomerMonitored?' + Ext.Object.toQueryString(params, true),
        success: function(reply){
          if (reply.success){
            customerView.setLoading(false);
            store.commitChanges();
          }else{
            customerView.setLoading(false);
            Ext.Msg.alert('System Info', reply.msg);
          }
        }
      });
    }
  }
});