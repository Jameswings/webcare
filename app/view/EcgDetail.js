Ext.define('WebCare.view.EcgDetail', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.ecgDetail',
  ecgCanvasPref: 'ecgCanvas',
  store: new Ext.data.Store({
    fields: [],
    data: [{}, {}]
  }),
  columns: [
    {
      text: 'ECG Main',
      dataIndex: '',
      width: 3050,
      renderer: function(value, p, record, index){
        var html = "";

        if (index == 0){
          html = '<canvas width="3040" height="260" id="' + this.ecgCanvasPref + index + '"></canvas>';
//                html = "<div style='height: 200; width: 100%'><h1 align='center'>Please Select ECG data</h1></div>";
        }else{
          html = '<div style="height: 200; width: 100%"><h1 align="center">Click to add a ECG for comparison </h1></div>'; // <canvas id="' + ecgCanvasPref + index + '"></canvas>"
        }
        return html;
      }
    }
  ],
  getEcgCanvas: function(index){
    var findKey = 'canvas[id=' + this.ecgCanvasPref + index + ']';
    return this.getEl().down(findKey);
  }
});