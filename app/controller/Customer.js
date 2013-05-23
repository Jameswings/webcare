Ext.define('WebCare.controller.Customer', {
  extend: 'Ext.app.Controller',
  stores: ['CustomerInfo'],
  refs: [
    {
      ref: 'customerList',
      selector: 'customerList'
    }
  ],
  init: function(){
      this.control({
        'customerList': {
          expand: this.onCustomerListShow
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
  onCustomerListShow: function(){
    var me = this;
    var customerList = me.getCustomerList();
    customerList.store.load();
  }

});