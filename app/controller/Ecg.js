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
//  todayFilter: new Ext.util.Filter({
//    disabled: true,
//    filterFn: function(record){
//      var date = record.get('creationTime');
//      return date && Ext.util.Format.date(new Date()) == Ext.util.Format.date(date);
//    }
//  }),
  unreadFilter: new Ext.util.Filter({
    disabled: true,
    filterFn: function(record){
      return !record.get('read');
    }
  }),
  searchFilter: new Ext.util.Filter({
    q: '',
    disabled: true,
    filterFn: function(record){
      var reg = new RegExp(Ext.String.escapeRegex(this.q), 'i');
      return record.get('cuIden') == this.q || reg.test(record.get('cuName'));
    }
  }),
  init: function(){
    var me = this,
      ecgInfoStore = me.getEcgInfoStore();
    ecgInfoStore.addFilter([me.unreadFilter, me.searchFilter]);
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
        },
        searchTriggerClick: function(triggerIndex){
          var ecgList = me.getEcgList();
          if (triggerIndex == 0){
            ecgList.clearSearchField();
            me.searchFilter.disabled = true;
            ecgInfoStore.filter();
          }else{
            var q = ecgList.getSearchFieldValue();
            me.searchFilter.q = q;
            me.searchFilter.disabled = false;
            ecgInfoStore.filter();
          }
        }
      },
      'checkbox[annotation=unread]': {
        change: function(checkbox, newValue, oldValue){
          me.unreadFilter.disabled = !newValue;
          ecgInfoStore.filter();
        }
      },
      'tipsdatepicker': {
        select: this.onEcgDataLoad
      }
    });
  },
  onLaunch: function() {
  },
  onDateTipsLoad: function(){
    var me = this,
      datePicker = me.getTipsDatePicker(),
      dateTipsStore = me.getDateTipsStore();

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
  },
  onEcgDataLoad: function(){
    var me = this,
      datePicker = me.getTipsDatePicker(),
      date = datePicker.getValue(),
      ecgList = me.getEcgList(),
      ecgListCondition = ecgList.getTBarValues(),
      ecgStore = me.getEcgInfoStore();

    var params = Ext.Object.merge({
      startDate: Ext.util.Format.date(date),
      endDate: Ext.util.Format.date(date)
    }, ecgListCondition);


    ecgStore.load({
      params: params
    });
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

      var date = record.get('creationTime'),
        dateTips = me.getDateTipsStore(),
        datePicker = me.getTipsDatePicker(),
        dtRecord = dateTips.findRecord('date', Ext.util.Format.date(date, 'Y-m-d'));

      if (dtRecord){

        dtRecord.set('number', dtRecord.get('number') - 1);
        var data = {};
        data[dtRecord.get('date')] = dtRecord.get('number');
        datePicker.setTipNumber(data);
      }
//      console.log('read!!');
    }
  }
});