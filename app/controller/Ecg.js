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
  onDateTipsLoad: function(records){
    var me = this;
    var datePicker = me.getTipsDatePicker();

    console.log(records);
    var data = Ext.Array.toKeyValueMap(Ext.Array.map(records, function(r){
       return r.data;
    }), 'date', 'number');
    datePicker.updateTipNumber(data);
  }
});