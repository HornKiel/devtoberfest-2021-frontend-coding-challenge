/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","./Label","./StepInput","sap/ui/unified/Calendar","sap/ui/unified/DateRange","sap/ui/unified/calendar/MonthPicker"],function(e,t,a,r,n,o){"use strict";var i=e.extend("sap.m.DynamicDateOption",{metadata:{library:"sap.m",properties:{key:{type:"string"},valueTypes:{type:"string[]",multiple:true}}}});i.prototype.getText=function(e){return this.getKey()};i.prototype.getValueHelpUITypes=function(e){throw new Error("Need implementation for method getValueHelpUITypes. Option: "+this.getKey())};i.prototype.createValueHelpUI=function(e,a){var r=e.getValue();var n=this.getValueHelpUITypes(e);var o=[];var i;if(!e.aControlsByParameters){e.aControlsByParameters={}}e.aControlsByParameters[this.getKey()]=[];for(var s=0;s<n.length;s++){if(n[s].getText()){o.push(new t({text:n[s].getText(),width:"100%"}))}i=this._createControl(s,n[s].getType(),r,a);o.push(i);e.aControlsByParameters[this.getKey()].push(i)}return o};i.prototype.validateValueHelpUI=function(e){var t=this.getValueHelpUITypes();for(var a=0;a<t.length;a++){var r=e.aControlsByParameters[this.getKey()][a];switch(t[a].getType()){case"int":if(r._isLessThanMin(r.getValue())||r._isMoreThanMax(r.getValue())){return false}break;case"month":case"date":case"daterange":if(!r.getSelectedDates()||r.getSelectedDates().length==0){return false}break}}return true};i.prototype.getValueHelpOutput=function(e){var t=this.getValueHelpUITypes(),a={},r;a.operator=this.getKey();a.values=[];for(var n=0;n<t.length;n++){var o=e.aControlsByParameters[this.getKey()][n];switch(t[n].getType()){case"int":r=o.getValue();break;case"month":case"date":if(!o.getSelectedDates().length){return null}r=o.getSelectedDates()[0].getStartDate();break;case"daterange":if(!o.getSelectedDates().length){return null}var i=o.getSelectedDates()[0].getEndDate()||o.getSelectedDates()[0].getStartDate();r=[o.getSelectedDates()[0].getStartDate(),i];break}if(Array.isArray(r)){a.values=Array.prototype.concat.apply(a.values,r)}else{r&&a.values.push(r)}}return a};i.prototype.getGroup=function(){return 0};i.prototype.getGroupHeader=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("DDR_OPTIONS_GROUP_0")};i.prototype.format=function(e){throw new Error("Need implementation for method format. Option: "+this.getKey())};i.prototype.parse=function(e){throw new Error("Need implementation for method parse. Option: "+this.getKey())};i.prototype.toDates=function(e){throw new Error("Need implementation for method toDates. Option: "+this.getKey())};i.prototype.enhanceFormattedValue=function(){return false};i.prototype._createControl=function(e,t,a,r){var n;switch(t){case"int":n=this._createIntegerControl(a,e,r);break;case"date":n=this._createDateControl(a,e,r);break;case"daterange":n=this._createDateRangeControl(a,e,r);break;case"month":n=this._createMonthControl(a,e,r);break}return n};i.prototype._createIntegerControl=function(e,t,r){var n=new a({width:"120px"});if(e&&this.getKey()===e.operator){n.setValue(e.values[t])}if(r instanceof Function){n.attachChange(function(){r(this)},this)}return n};i.prototype._createDateControl=function(e,t,a){var o=new r({width:"100%"});if(e&&this.getKey()===e.operator){o.addSelectedDate(new n({startDate:e.values[t]}))}if(a instanceof Function){o.attachSelect(function(){a(this)},this)}return o};i.prototype._createDateRangeControl=function(e,t,a){var o=new r({intervalSelection:true,width:"100%"});if(e&&this.getKey()===e.operator){o.addSelectedDate(new n({startDate:e.values[t],endDate:e.values[t+1]}))}if(a instanceof Function){o.attachSelect(function(){a(this)},this)}return o};i.prototype._createMonthControl=function(e,t,a){var r=new o,i=new Date,s=e&&this.getKey()===e.operator?e.values[t]:i.getMonth();r.setMonth(s);r.addSelectedDate(new n({startDate:i}));if(a instanceof Function){r.attachSelect(function(){a(this)},this)}return r};return i});