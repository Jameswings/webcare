Ext.define('WebCare.view.TipsDatePicker', {
  extend: 'Ext.picker.Date',
  width: 250,
  alias: 'widget.tipsdatepicker',
  fullUpdate: function(date){
    var me = this,
      cells = me.cells.elements,
      textNodes = me.textNodes,
      disabledCls = me.disabledCellCls,
      eDate = Ext.Date,
      i = 0,
      extraDays = 0,
      visible = me.isVisible(),
      sel = +eDate.clearTime(date, true),
      today = +eDate.clearTime(new Date()),
      min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
      max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
      ddMatch = me.disabledDatesRE,
      ddText = me.disabledDatesText,
      ddays = me.disabledDays ? me.disabledDays.join('') : false,
      ddaysText = me.disabledDaysText,
      format = me.format,
      days = eDate.getDaysInMonth(date),
      firstOfMonth = eDate.getFirstDateOfMonth(date),
      startingPos = firstOfMonth.getDay() - me.startDay,
      previousMonth = eDate.add(date, eDate.MONTH, -1),
      longDayFormat = me.longDayFormat,
      disabled,
      prevStart,
      current,
      disableToday,
      tempDate,
      setCellClass,
      html,
      cls,
      formatValue,
      value;

    if (startingPos < 0) {
      startingPos += 7;
    }

    days += startingPos;
    prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
    current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);

    if (me.showToday) {
      tempDate = eDate.clearTime(new Date());
      disableToday = (tempDate < min || tempDate > max ||
        (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
        (ddays && ddays.indexOf(tempDate.getDay()) != -1));

      if (!me.disabled) {
        me.todayBtn.setDisabled(disableToday);
        me.todayKeyListener.setDisabled(disableToday);
      }
    }

    setCellClass = function(cell, cls){
      disabled = false;
      value = +eDate.clearTime(current, true);
      cell.title = eDate.format(current, longDayFormat);
      cell.alt = eDate.format(current, 'Y-m-d');
      // store dateValue number as an expando
      cell.firstChild.dateValue = value;
      if(value == today){
        cls += ' ' + me.todayCls;
        cell.title = me.todayText;
      }
      if(value == sel){
        cls += ' ' + me.selectedCls;
        me.fireEvent('highlightitem', me, cell);
        if (visible && me.floating) {
          Ext.fly(cell.firstChild).focus(50);
        }
      }
      // disabling, once the cell is disabled we can short circuit
      // the other more expensive checks
      if(value < min) {
        cls += ' ' + disabledCls;
        cell.title = me.minText;
        disabled = true;
      }
      if (!disabled && value > max) {
        cls += ' ' + disabledCls;
        cell.title = me.maxText;
        disabled = true;
      }
      if (!disabled && ddays) {
        if(ddays.indexOf(current.getDay()) !== -1){
          cell.title = ddaysText;
          cls += ' ' + disabledCls;
          disabled = true;
        }
      }
      if(!disabled && ddMatch && format){
        formatValue = eDate.dateFormat(current, format);
        if(ddMatch.test(formatValue)){
          cell.title = ddText.replace('%0', formatValue);
          cls += ' ' + disabledCls;
        }
      }
      cell.className = cls + ' ' + me.cellCls;
    };

    for(var first = true; i < me.numDays; ++i) {
      if (i < startingPos) {
        html = (++prevStart);
        cls = me.prevCls;
      } else if (i >= days) {
        html = (++extraDays);
        cls = me.nextCls;
      } else {
        html = i - startingPos + 1;
        cls = me.activeCls;
      }
      current.setDate(current.getDate() + 1);
      if (first){
        me.rangeStart = Ext.Date.clone(current);
        first = false;
      }
      textNodes[i].innerHTML = '<span style="vertical-align: top; width: 6px; font-size: 6pt; color: red;-webkit-text-size-adjust:none;" hiddenvalue="' + eDate.format(current, 'Y-m-d') + '"></span>' + html;
      setCellClass(cells[i], cls);
    }
    me.rangeEnd = Ext.Date.clone(current);

    me.monthBtn.setText(Ext.Date.format(date, me.monthYearFormat));
  },
  updateTipNumber: function(data){
    var me = this;
    if (data){
      Ext.each(me.textNodes, function(node){
        var numberOfUnread = data[node.children[0].getAttribute('hiddenvalue')];
        if (numberOfUnread){
          if (numberOfUnread > 10){
            numberOfUnread = '10+';
          }
          node.children[0].innerText = numberOfUnread;
        }else{
          node.children[0].innerText = '';
        }
      });
    }
  },
  setTipNumber: function(data){
    var me = this;
    if (data){
      Ext.each(me.textNodes, function(node){
        var numberOfUnread = data[node.children[0].getAttribute('hiddenvalue')];
        if (numberOfUnread){
          if (numberOfUnread > 10){
            numberOfUnread = '10+';
          }
          node.children[0].innerText = numberOfUnread;
        }
      });
    }
  },
  getRange: function(format){
    var me = this;
    if (format){
      return {start: Ext.Date.format(me.rangeStart, format), end: Ext.Date.format(me.rangeEnd, format)};
    }
    return {start: me.rangeStart, end: me.rangeEnd};
  }
});