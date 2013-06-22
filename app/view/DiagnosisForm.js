Ext.define('WebCare.view.DiagnosisForm',{
  extend: 'Ext.form.Panel',
  alias: 'widget.diagnosisForm',
  title: 'Diagnosis Info',
  layout: 'fit',
  width: 250,
  url: careServerUrl + 'diagnosis!save',
  items: [
    {
      fieldLabel: ' ',
      labelSeparator: '',
      hideLabel: true,
      allowBlank: false,
      xtype: 'textarea',
      msgTarget: 'diagnosisErrDiv',
      name: 'message',
      value: '',
      emptyText: 'No message left here'
    }
  ],
  buttons: [
    {
      text: 'Submit',
      annotation: 'submit'
    },
    {
      text: 'Reset',
      annotation: 'reset'
    }
  ]
});