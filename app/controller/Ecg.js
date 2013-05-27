Ext.define('WebCare.controller.Ecg', {
  extend: 'Ext.app.Controller',
  stores: ['DateTips', 'EcgInfo'],
  refs: [
    {
      ref: 'tipsDatePicker',
      selector: 'tipsdatepicker'
    },
    {
      ref: 'customerListView',
      selector: 'customerView'
    },
    {
      ref: 'titleButton',
      selector: 'ecgList tool[type=plus]'
    }
  ],
  init: function(){
     this.control({
       'box[toolButton=addCustomer]': {
         click: this.toggleAddCustomerList
       }
     });
  },
  onLaunch: function() {
    var dateTipsStore = this.getDateTipsStore();
    dateTipsStore.load({
      callback: this.onDateTipsLoad,
      scope: this
    });
  },
  onDateTipsLoad: function(records){
    if (!records){
      return;
    }
    var me = this;
    var datePicker = me.getTipsDatePicker();

    var data = Ext.Array.toKeyValueMap(Ext.Array.map(records, function(r){
       return r.data;
    }), 'date', 'number');
    datePicker.updateTipNumber(data);
  },
  toggleAddCustomerList: function(){
    var me = this;
    var customerList = me.getCustomerListView();
    if (customerList.getCollapsed()){
      customerList.expand(false);
      me.getTitleButton().setType('left');
    }else{
      customerList.collapse();
      me.getTitleButton().setType('plus');
    }
  }
});