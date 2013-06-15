Ext.define('WebCare.controller.Customer', {
  extend: 'Ext.app.Controller',
  stores: ['CustomerInfo'],
  refs: [
    {
      ref: 'customerView',
      selector: 'customerView'
    }
  ],
  customerMonitoredChange: false,
  init: function(){
      this.control({
        'customerView': {
          afterrender: this.onListShow,
          collapse: this.onCollapse
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
    var me = this,
      cv = me.getCustomerView();

    cv.store.load();
  },
  changeCustomerMonitored: function(){
    var me = this,
      store = me.getCustomerInfoStore(),
      customerView = me.getCustomerView(),
      updatedRecord = store.getUpdatedRecords();

    if (updatedRecord.length > 0){
      var datar = [];
      Ext.each(updatedRecord, function(r, index){
        datar[index] = r.data;
      });
      customerView.setLoading(true);
      Ext.Ajax.request({
        url: careServerUrl + 'customer!saveCustomerMonitored',
        method: 'post',
        params: Ext.Object.toStrutsParamString(datar[0], 'customer'),
        success: function(response){
          var reply = Ext.decode(response.responseText);
          if (reply.success){
            customerView.setLoading(false);
            customerView.setLoading(false);
            me.setCustomerMonitoredChange(true);
            store.commitChanges();
          }else{
            customerView.setLoading(false);
            Ext.Msg.alert('System Info', reply.msg);
          }
        },
        failure: function(response){
          var reply = Ext.decode(response.responseText);
          customerView.setLoading(false);
          Ext.Msg.alert('System Info', reply.msg);
        }
      });
    }
  },
  setCustomerMonitoredChange: function(changed){
    this.customerMonitoredChange = changed;
  },
  onCollapse: function(){
    var me = this,
      cv = me.getCustomerView();

    if (me.customerMonitoredChange){
      me.getApplication().refreshData();
      me.setCustomerMonitoredChange(false);
    }else{
      console.log('no change');
    }
  }
});