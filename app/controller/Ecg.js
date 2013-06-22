Ext.define('WebCare.controller.Ecg', {
  extend: 'Ext.app.Controller',
  stores: ['DateTips', 'EcgInfo'],
  delay: 2000, // for delay task
  delayedTask: new Ext.util.DelayedTask(), // delay read ecg task
  tipsDelay: 1000,
  delayedTipsTask: new Ext.util.DelayedTask(),
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
    },
    {
      ref: 'ecgDetail',
      selector: 'ecgDetail'
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

    me.app = me.getApplication();
    ecgInfoStore.addFilter([me.unreadFilter, me.searchFilter]);

    // Ecg list controls
    me.control({
      'box[toolButton=addCustomer]': {
        click: me.toggleAddCustomerList
      },
      'ecgList': {
        itemclick: function(grid, record, item, index){
          var customerController = me.app.getCustomerController();
          customerController.setCustomerValue({
            id: record.get('customerId'),
            name: record.get('cuName'),
            nickname: record.get('cuNickname'),
            sex: record.get('cuSexStr'),
            iden: record.get('cuIden'),
            age: record.get('cuAge'),
            cellPhone: record.get('cuCellPhone')
          });
          var ecgDetailList = me.getEcgDetail();
          var canvas = ecgDetailList.getEcgCanvas(0).dom;
          me.app.drawEcgBg(canvas);
          Ext.Ajax.request({
            url: careServerUrl + 'ecg!getEcgDataLine',
            params: {
              ecgId: record.get('id')
            },
            success: function(response){
              var reply = Ext.decode(response.responseText);
              me.app.drawEcgLine(canvas, reply.value);
              me.app.getDiagnosisController().refreshDiagnosis(record.get('id'));
              if (record.get('read') == false){
                me.delayedTask.delay(me.delay, me.readingNewEcg, me, [record]);
              }
            },
            failure: function(response){ // 这里是失败返回之后的调用
//              Ext.Msg.alert('Title', 'Server error: ' + response.status);
            }
          });
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
      'ecgList trigger': {
        specialkey: function(field, e){
          // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
          // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
          if (e.getKey() == e.ENTER) {
            var ecgList = me.getEcgList();
            var q = ecgList.getSearchFieldValue();
            me.searchFilter.q = q;
            me.searchFilter.disabled = false;
            ecgInfoStore.filter();
          }
        }
      },
      'ecgList checkbox[annotation=unread]': {
        change: function(checkbox, newValue, oldValue){
          me.unreadFilter.disabled = !newValue;
          ecgInfoStore.filter();
        }
      },
      'tipsdatepicker': {
        select: this.onEcgDataLoad,
        displaychange: this.onDateTipsLoad
      }
    });


    // ECG detail controls
    me.control({
      'ecgDetail': {
        itemdblclick: function(gridView, record, item, index){
          if (index == 0){
            return;
          }
//          record.set('drawBg', true);
//          gridView.refreshNode(index);
//          var canvas = me.getEcgDetail().getEcgCanvas(index).dom;
//          me.app.drawEcgBg(canvas);
          WebCare.Waterfall.msg('[In Development]', 'show history ECG');
        }
      }
    });
  },
  onLaunch: function() {
  },
  onDateTipsLoad: function(){
    var me = this,
      datePicker = me.getTipsDatePicker(),
      dateTipsStore = me.getDateTipsStore();

    me.delayedTipsTask.delay(me.tipsDelay, function(){
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
        scope: me
      });
    })

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
      Ext.Ajax.request({
        url: careServerUrl + 'ecg!readEcg',
        method: 'post',
        params: {
          ecgId: record.get('id')
        },
        success: function(response){
          var reply = Ext.decode(response.responseText);
          if (reply.success){
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
          }else{
            me.app.statusErr('Unknown errors!')
          }
        },
        failure: function(response){
          me.app.statusErr('Unknown errors!')
        }
      });
//      console.log('read!!');
    }
  },
  drawEcgBg: function(){
    var me = this,
      ecgDetailList = me.getEcgDetail(),
      canvas = ecgDetailList.getEcgCanvas(0);

    me.app.drawEcgBg(canvas.dom);
  },
  currentEcgValue: function(){
    var selection = this.getEcgList().getSelectionModel().getSelection();
    if (selection.length == 0){
      return {};
    }
    return selection[0].data; // only show 1 origin ecg
  }
});