Ext.define('WebCare.view.EcgDetail', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.ecgDetail',
  ecgCanvasPref: 'ecgCanvas',
  hideHeaders: true,
  store: new Ext.data.Store({
    fields: [{name: 'drawBg', type: 'bool'}],
    data: [{drawBg: true}, {drawBg: false}]
  }),
  columns: [
    {
      text: 'ECG Main',
      dataIndex: '',
      width: 3050,
      renderer: function(value, p, record, index){
        var html = "";

        if (record.get('drawBg')){
          html = '<canvas width="3040" height="260" id="' + this.ecgCanvasPref + index + '"></canvas>';
        }else{
          html = '<div annotation="comparisonEcg"><div style="height: 200; width: 100%"><h1 align="left" style="padding-left: 50px">Double Click to add a ECG for comparison </h1></div></div>'; // <canvas id="' + ecgCanvasPref + index + '"></canvas>"
        }
        return html;
      }
    }
  ],
  tbar: [
    '<h3>ECG information</h3>',
    '->',
    'Resolution Rate: ',
    {
      xtype: 'combo',
      hideLabel: true,
      editable: false,
      displayField: 'display',
      valueField: 'value',
      value: '1',
      store: new Ext.data.Store({
        fields: ['display', 'value'],
        data: [
          {
            display: '1920 * 1080, 21.5"',
            value: '1'
          }
        ]
      })
    }
  ],
  getEcgCanvas: function(index){
    var findKey = 'canvas[id=' + this.ecgCanvasPref + index + ']';
    return this.getEl().down(findKey);
  }
});