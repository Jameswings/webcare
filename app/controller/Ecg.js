Ext.define('WebCare.controller.Ecg', {
  extend: 'Ext.app.Controller',
  stores: ['DateTips', 'EcgInfo'],
  delayedTask: new Ext.util.DelayedTask(),
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
    },
    {
      ref: 'ecgList',
      selector: 'ecgList'
    }
  ],
  init: function(){
    var me = this;
    me.control({
      'box[toolButton=addCustomer]': {
        click: me.toggleAddCustomerList
      },
      'ecgList': {
        itemclick: function(grid, record, item, index){
          drawCanvas('ecgCanvas0', [], 0, 0);
          if (record.get('read') == false){
            me.delayedTask.delay(1000, me.readingNewEcg, me, [record]);
          }
        }
      }
    });
  },
  onLaunch: function() {
  },
  onDateTipsLoad: function(){
    var me = this,
      datePicker = me.getTipsDatePicker(),
      dateTipsStore = me.getDateTipsStore(),
      ecgStore = me.getEcgInfoStore();

    dateTipsStore.load({
      callback: function(records){
        if (!records){
          return;
        }

        var data = Ext.Array.toKeyValueMap(Ext.Array.map(records, function(r){
          return r.data;
        }), 'date', 'number');
        datePicker.updateTipNumber(data);
      },
      scope: this
    });

    ecgStore.load();
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
  },
  readingNewEcg: function(record){
    var me = this,
      ecgList = me.getEcgList(),
      selection = ecgList.getSelectionModel().getSelection();

    if (selection.length > 0 && selection[0].get('id') == record.get('id')){
      record.set('read', true);
//      console.log('read!!');
    }
  }
});