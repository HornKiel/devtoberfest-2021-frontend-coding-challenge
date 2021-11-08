/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(t){"use strict";var i=function(t){this._errorPrefix=t.errorPrefix};i.prototype.validate=function(t){this._validate({inputToValidate:t,validationInfo:{validationInfo:{type:"object",mandatory:true},inputToValidate:{type:"object",mandatory:true},allowUnknownProperties:"bool"}});this._validate(t)};i.prototype._validate=function(t){var i=this._getErrors(t);if(i.length===1){throw new Error(this._errorPrefix+" - "+i[0])}if(i.length){throw new Error("Multiple errors where thrown "+this._errorPrefix+"\n"+i.join("\n"))}};i.prototype._getErrors=function(t,n,r){n=n||[];r=r?r+".":"";if(!t.allowUnknownProperties){Object.keys(t.inputToValidate).forEach(function(i){if(!t.validationInfo[i]){n.push("the property '"+r+i+"' is not defined in the API")}})}Object.keys(t.validationInfo).forEach(function(e){var o=r+e;var a=t.inputToValidate[e];var s=this._getParameterValidationInfo(t.validationInfo[e]);if(a===undefined||a===null){if(s.mandatory){n.push("No '"+o+"' given but it is a mandatory parameter")}}else if(s.hasOwnProperty("type")){var u=i.types[s.type];if(!u.isValid(a)){n.push("the '"+o+"' parameter needs to be "+u.description+" but '"+a+"' was passed")}}else{n.concat(this._getErrors({validationInfo:s,inputToValidate:a,allowUnknownProperties:t.allowUnknownProperties},n,o))}}.bind(this));return n};i.prototype._getParameterValidationInfo=function(t){if(typeof t==="string"){return{type:t,mandatory:false}}return t};i.types={func:{isValid:function(t){return typeof t==="function"},description:"a function"},array:{isValid:function(t){return Array.isArray(t)},description:"an array"},object:{isValid:function(i){return t.isPlainObject(i)},description:"an object"},string:{isValid:function(t){return typeof t==="string"||t instanceof String},description:"a string"},bool:{isValid:function(t){return typeof t==="boolean"},description:"a boolean value"},numeric:{isValid:function(t){return n(t)},description:"numeric"},positivenumeric:{isValid:function(t){return n(t)&&t>0},description:"a positive numeric"},any:{isValid:function(){return true},description:"any value"}};function n(t){return(typeof t==="number"||typeof t==="string")&&!isNaN(t-parseFloat(t))}return i},true);