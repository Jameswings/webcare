Ext.define('WebCare.view.DiagnosisForm',{
  extend: 'Ext.form.Panel',
  alias: 'widget.diagnosisForm',
  title: 'Diagnosis Info',
  layout: 'fit',
  width: 250,
  items: [
    {
      fieldLabel: ' ',
      labelSeparator: '',
      hideLabel: true,
      xtype: 'textarea',
      name: 'name',
      value: '',
      emptyText: 'No message leave here'
    }
  ]
});