Ext.define('WebCare.controller.Diagnosis', {
  extend: 'Ext.app.Controller',
  refs: [
    {
      ref: 'diagnosisForm',
      selector: 'diagnosisForm'
    }
  ],
  init: function(){
    var me = this;

    me.control({
      'diagnosisForm button[annotation=submit]': {
        click: function(button){
//          button.up('form').
        }
      }
    });
  }
});