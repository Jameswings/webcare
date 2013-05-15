Ext.define('WebCare.controller.Ecg', {
  extend: 'Ext.app.Controller',
  stores: ['DateTips'],
  refs: [
    {
      ref: 'tipsDatePicker',
      selector: 'tipsdatepicker'
    }
  ],
  init: function(){

  },
  onLaunch: function() {
    var dateTipsStore = this.getDateTipsStore();
    dateTipsStore.load({
      callback: this.onDateTipsLoad,
      scope: this
    });
  },
  onDateTipsLoad: function(){
    var me = this;
    var datePicker = me.getTipsDatePicker(),
        dateTipsStore = me.getDateTipsStore();
    window.store = dateTipsStore;
    console.log(dateTipsStore);
    var data = Ext.Array.map(records, function(r){
      return r.data;
    });
    datePicke.updateTipNumber(data);
  }
});