/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define("sap/ui/debug/ControlTree",["sap/ui/base/EventProvider","sap/ui/core/Element","sap/ui/core/UIArea","./Highlighter","sap/ui/dom/getOwnerWindow","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,i,s,r,o,n){"use strict";var a=e.extend("sap.ui.debug.ControlTree",{constructor:function(t,i,r,o){e.apply(this,arguments);this.oWindow=i;this.oDocument=i.document;this.oCore=t;this.oSelectedNode=null;this.oParentDomRef=r;this.oSelectionHighlighter=new s("sap-ui-testsuite-SelectionHighlighter");this.oHoverHighlighter=new s("sap-ui-testsuite-HoverHighlighter",true,"#c8f",1);var a=this;n(r).bind("click",function(e){a.onclick(e)}).bind("mouseover",function(e){a.onmouseover(e)}).bind("mouseout",function(e){a.onmouseout(e)});this.enableInplaceControlSelection();this.oCore.attachUIUpdated(this.renderDelayed,this);this.sSelectedNodeId="";this.sResourcePath=o?sap.ui.require.toUrl("")+"/":window.top.testfwk.sResourceRoot||"../";this.sTestResourcePath=this.sResourcePath+"../test-resources/";this.sSpaceUrl=this.sResourcePath+"sap/ui/debug/images/space.gif";this.sMinusUrl=this.sResourcePath+"sap/ui/debug/images/minus.gif";this.sPlusUrl=this.sResourcePath+"sap/ui/debug/images/plus.gif";this.sLinkUrl=this.sResourcePath+"sap/ui/debug/images/link.gif"}});a.M_EVENTS={SELECT:"SELECT"};a.prototype.exit=function(){n(document).unbind();n(this.oParentDomRef).unbind()};a.prototype.renderDelayed=function(){if(this.oTimer){this.oWindow.jQuery.sap.clearDelayedCall(this.oTimer)}this.oTimer=this.oWindow.jQuery.sap.delayedCall(0,this,"render")};a.prototype.render=function(){var e=this.oParentDomRef;var t=null,i=this.oCore.mUIAreas;e.innerHTML="";for(var s in i){var t=i[s],r=this.createTreeNodeDomRef(t.getId(),0,"UIArea",this.sTestResourcePath+"sap/ui/core/images/controls/sap.ui.core.UIArea.gif");e.appendChild(r);var o=t.getContent();for(var s=0,n=o.length;s<n;s++){this.renderNode(e,o[s],1)}}};a.prototype.createTreeNodeDomRef=function(e,t,i,s){var r=this.oParentDomRef.ownerDocument.createElement("DIV");r.setAttribute("id","sap-debug-controltree-"+e);var o=i.substring(i.lastIndexOf(".")>-1?i.lastIndexOf(".")+1:0);r.innerHTML="<img style='height:12px;width:12px;display:none' src='"+this.sSpaceUrl+"' align='absmiddle'/><img style='height:16px;width:16px' src='"+s+"' align='absmiddle'/>&nbsp;<span>"+o+" - "+e+"</span>";r.style.overflow="hidden";r.style.whiteSpace="nowrap";r.style.textOverflow="ellipsis";r.style.paddingLeft=t*16+"px";r.style.height="20px";r.style.cursor="default";r.setAttribute("sap-type",i);r.setAttribute("sap-id",e);r.setAttribute("sap-expanded","true");r.setAttribute("sap-level",""+t);r.title=i+" - "+e;return r};a.prototype.createLinkNode=function(e,t,i,s){var r=this.oParentDomRef.ownerDocument.createElement("DIV");r.setAttribute("id","sap-debug-controltreelink-"+t);var o=s?s.substring(s.lastIndexOf(".")>-1?s.lastIndexOf(".")+1:0):"";r.innerHTML="<img style='height:12px;width:12px;display:none' src='"+this.sSpaceUrl+"' align='absmiddle'/><img style='height:12px;width:12px' src='"+this.sLinkUrl+"' align='absmiddle'/>&nbsp;<span style='color:#888;border-bottom:1px dotted #888;'>"+(o?o+" - ":"")+t+"</span>";r.style.overflow="hidden";r.style.whiteSpace="nowrap";r.style.textOverflow="ellipsis";r.style.paddingLeft=i*16+"px";r.style.height="20px";r.style.cursor="default";r.setAttribute("sap-type","Link");r.setAttribute("sap-id",t);r.setAttribute("sap-expanded","true");r.setAttribute("sap-level",""+i);r.title="Association to '"+t+"'";e.appendChild(r);return r};a.prototype.renderNode=function(e,i,s){if(!i){return}var r=i.getMetadata();var o=this.sTestResourcePath+r.getLibraryName().replace(/\./g,"/")+"/images/controls/"+r.getName()+".gif";var n=this.createTreeNodeDomRef(i.getId(),s,r.getName(),o);e.appendChild(n);var a=false;if(i.mAggregations){for(var l in i.mAggregations){a=true;var d=i.mAggregations[l];if(d&&d.length){for(var h=0;h<d.length;h++){var p=d[h];if(p instanceof t){this.renderNode(e,d[h],s+1)}}}else if(d instanceof t){this.renderNode(e,d,s+1)}}}if(i.mAssociations){for(var l in i.mAssociations){a=true;var u=i.mAssociations[l];if(Array.isArray(u)){for(var h=0;h<u.length;h++){var p=u[h];if(typeof p==="string"){this.createLinkNode(e,p,s+1)}}}else if(typeof u==="string"){this.createLinkNode(e,u,s+1)}}}if(a){var g=n.getElementsByTagName("IMG")[0];g.src=this.sMinusUrl;g.style.display=""}};a.prototype.onclick=function(e){var i=e.target;if(i.tagName=="IMG"){var s=i.parentNode,r=parseInt(s.getAttribute("sap-level")),o=s.nextSibling,n=s.getAttribute("sap-expanded")=="true";i=s.firstChild;if(o){var a=parseInt(o.getAttribute("sap-level"));while(o&&a>r){var l=o.getElementsByTagName("IMG")[0];if(n){o.style.display="none";o.setAttribute("sap-expanded","false");if(l&&l.src!==this.sSpaceUrl){l.src=this.sPlusUrl}}else{o.style.display="block";o.setAttribute("sap-expanded","true");if(l&&l.src!==this.sSpaceUrl){l.src=this.sMinusUrl}}o=o.nextSibling;if(o){a=parseInt(o.getAttribute("sap-level"))}}}if(n){i.src=this.sPlusUrl;s.setAttribute("sap-expanded","false")}else{i.src=this.sMinusUrl;s.setAttribute("sap-expanded","true")}}else{if(i.tagName!="SPAN"){i=i.getElementsByTagName("SPAN")[0]}var s=i.parentNode,d=s.getAttribute("sap-id"),h=this.oCore.byId(d),p=s.getAttribute("sap-type")==="Link"?"sap-debug-controltree-"+d:s.id;this.oSelectionHighlighter.hide();if(h instanceof t){this.oSelectionHighlighter.highlight(h.getDomRef());this.oHoverHighlighter.hide()}this.deselectNode(this.sSelectedNodeId);this.selectNode(p)}};a.prototype.onmouseover=function(e){var t=e.target;if(t.tagName=="SPAN"){this.oHoverHighlighter.highlight(this.getTargetDomRef(t.parentNode))}};a.prototype.onmouseout=function(e){var t=e.target;if(t.tagName=="SPAN"){if(this.getTargetDomRef(t.parentNode)){this.oHoverHighlighter.hide()}}};a.prototype.selectNode=function(e){if(!e){return}var t=(r(this.oParentDomRef)||window).document.getElementById(e);if(!t){o.warning("Control with Id '"+e.substring(22)+"' not found in tree");return}var i=t.getAttribute("sap-id");var s=t.getElementsByTagName("SPAN")[0];s.style.backgroundColor="#000066";s.style.color="#FFFFFF";this.sSelectedNodeId=e;this.fireEvent(a.M_EVENTS.SELECT,{id:e,controlId:i})};a.prototype.deselectNode=function(e){if(!e){return}var t=(r(this.oParentDomRef)||window).document.getElementById(e);var i=t.getElementsByTagName("SPAN")[0];i.style.backgroundColor="transparent";i.style.color="#000000";this.sSelectedNodeId=e};a.prototype.getTargetDomRef=function(e){var s=e.getAttribute("sap-type"),r=e.getAttribute("sap-id"),o=s==="UIArea"?this.oCore.getUIArea(r):this.oCore.byId(r);while(o instanceof t){var n=o.getDomRef();if(n){return n}o=o.getParent()}if(o instanceof i){return o.getRootNode()}};a.prototype.enableInplaceControlSelection=function(){var e=this;n(document).bind("mouseover",function(t){e.selectControlInTree(t)})};a.prototype.selectControlInTree=function(e){if(e){if(e.ctrlKey&&e.shiftKey&&!e.altKey){var t=e.srcElement||e.target;while(t&&(!t.id||!this.oCore.getControl(t.id))){t=t.parentNode}if(t&&t.id&&this.oCore.getControl(t.id)){this.oHoverHighlighter.highlight(t)}else{this.oHoverHighlighter.hide()}}else{this.oHoverHighlighter.hide()}}};return a});