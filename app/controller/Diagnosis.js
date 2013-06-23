Ext.define('WebCare.controller.Diagnosis', {
  extend: 'Ext.app.Controller',
  refs: [
    {
      ref: 'diagnosisForm',
      selector: 'diagnosisForm'
    },
    {
      ref: 'customerForm',
      selector: 'customerForm'
    }
  ],
  init: function(){
    var me = this;

    me.control({
      'diagnosisForm button[annotation=submit]': {
        click: me.submitDiagnosis
      },
      'diagnosisForm button[annotation=reset]': {
        click: me.resetDiagnosis
      }
    });
  },
  submitDiagnosis: function(){
    var me = this,
      customerForm = me.getCustomerForm(),
      customerInfo = customerForm.getValues(),
      form = me.getDiagnosisForm();

    if (form.isValid()){
      var customer = me.getApplication().getCustomerController().currentCustomerValue();
      var ecg = me.getApplication().getEcgController().currentEcgValue();

      form.submit({
        url: careServerUrl + 'diagnosis!save',
        params: {
          ecgId: ecg.id ,
          customerId: customer.id
        },
        success: function(form, action){
          WebCare.Waterfall.msg('Success', action.result.msg);
        },
        failure: function(form, action){
          switch (action.failureType) {
            case Ext.form.action.Action.CLIENT_INVALID:
              Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
              break;
            case Ext.form.action.Action.CONNECT_FAILURE:
              Ext.Msg.alert('Failure', 'Ajax communication failed');
              break;
            case Ext.form.action.Action.SERVER_INVALID:
              Ext.Msg.alert('Failure', action.result.msg);
          }
        }
      });
    }
//    this.getDiagnosisForm().submit({
//      clientValidation: true,
//      url: careServerUrl + 'diagnosis!save',
//      params: {
//        newStatus: 'delivered'
//      },
//      success: function(form, action) {
//        Ext.Msg.alert('Success', action.result.msg);
//      },
//      failure: function(form, action) {
//        switch (action.failureType) {
//          case Ext.form.action.Action.CLIENT_INVALID:
//            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
//            break;
//          case Ext.form.action.Action.CONNECT_FAILURE:
//            Ext.Msg.alert('Failure', 'Ajax communication failed');
//            break;
//          case Ext.form.action.Action.SERVER_INVALID:
//            Ext.Msg.alert('Failure', action.result.msg);
//        }
//      }
//    })
  },
  resetDiagnosis: function(){
    var form = this.getDiagnosisForm().getForm();
    form.reset();
    form.clearInvalid();
  },
  refreshDiagnosis: function(ecgId){
    var me = this,
      dForm = me.getDiagnosisForm();
    if (ecgId){
      dForm.setLoading(true);
      Ext.Ajax.request({
        url: careServerUrl + 'diagnosis!retrieveByEcg',
        params:{
          ecgId: ecgId
        },
        success: function(response){
          var reply = Ext.decode(response.responseText);
          dForm.setLoading(false);
          if (reply.success){
            if (reply.value){
              dForm.getForm().setValues(reply.value);
            }else{
              dForm.setDisabled(false);
            }

          }else{
            WebCare.Waterfall.err('System Info', reply.msg);
          }
        },
        failure: function(response){
          dForm.setLoading(false);
          WebCare.Waterfall.err('System Info', response.status + ': ' + response.statusText);
        }
      });
    }else{
      dForm.getForm().setValues({ecgId: '', message: ''});
      dForm.setDisabled(true);
    }
  }
});