Ext.define('WebCare.controller.Customer', {
  extend: 'Ext.app.Controller',
  stores: ['CustomerInfo'],
  refs: [
    {
      ref: 'customerView',
      selector: 'customerView'
    },
    {
      ref: 'customerForm',
      selector: 'customerForm'
    }
  ],
  customerMonitoredChange: false,
  monitoredFilter: new Ext.util.Filter({
    disabled: true,
    filterFn: function(record){
      return record.get('monitored');
    }
  }),
  searchFilter: new Ext.util.Filter({
    q: '',
    disabled: true,
    filterFn: function(record){
      var reg = new RegExp(Ext.String.escapeRegex(this.q), 'i');
      return record.get('iden') == this.q || reg.test(record.get('name'));
    }
  }),
  init: function(){
    var me = this,
      ciStore = me.getCustomerInfoStore();
    me.app = me.getApplication();

    ciStore.addFilter([me.monitoredFilter, me.searchFilter]);
    me.control({
      'customerView': {
        afterrender: this.onListShow,
        collapse: this.onCustomerViewCollapse,
        searchTriggerClick: function(triggerIndex){
          var customerView = me.getCustomerView();
          if (triggerIndex == 0){
            customerView.clearSearchField();
            me.searchFilter.disabled = true;
            ciStore.filter();
          }else{
            var q = customerView.getSearchFieldValue();
            me.searchFilter.q = q;
            me.searchFilter.disabled = false;
            ciStore.filter();
          }
        }
      },
      'customerView trigger': {
        specialkey: function(field, e){
          // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
          // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
          if (e.getKey() == e.ENTER) {
            var customerView = me.getCustomerView();
            var q = customerView.getSearchFieldValue();
            me.searchFilter.q = q;
            me.searchFilter.disabled = false;
            ciStore.filter();
          }
        }
      },
      'customerView checkcolumn': {
        checkchange: this.changeCustomerMonitored
      },
      'customerView > toolbar > checkbox[annotation=monitored]': {
        change: function(checkbox, newValue, oldValue){
          me.monitoredFilter.disabled = !newValue;
          ciStore.filter();
        }
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
            me.setCustomerMonitoredChange(true);
            store.commitChanges();
          }else{
            WebCare.Waterfall.err('System Info', reply.msg);
          }
          customerView.setLoading(false);
        },
        failure: function(response){
          var reply = Ext.decode(response.responseText);
          customerView.setLoading(false);
          WebCare.Waterfall.err('System Info', reply.msg);
        }
      });
    }
  },
  setCustomerMonitoredChange: function(changed){
    this.customerMonitoredChange = changed;
  },
  onCustomerViewCollapse: function(){
    var me = this,
      cv = me.getCustomerView();

    if (me.customerMonitoredChange){
      me.getApplication().refreshData();
      me.setCustomerMonitoredChange(false);
    }else{
      console.log('no change');
    }
  },
  setCustomerValue: function(data){
    data = data || {};
    var form = this.getCustomerForm();
    form.getForm().setValues(data);
  },
  currentCustomerValue: function(){
    return this.getCustomerForm().getValues(false, false, false, true);
  }
});