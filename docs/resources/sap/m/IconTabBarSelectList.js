/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","./IconTabBarDragAndDropUtil","./IconTabBarSelectListRenderer","sap/ui/thirdparty/jquery"],function(e,t,i,r,o,a){"use strict";var n=t.extend("sap.m.IconTabBarSelectList",{metadata:{library:"sap.m",aggregations:{items:{type:"sap.m.IconTabFilter",multiple:true,singularName:"item",dnd:true}},events:{selectionChange:{parameters:{selectedItem:{type:"sap.m.IconTabFilter"}}}}}});n.prototype.init=function(){this._itemNavigation=new i;this._itemNavigation.setCycling(false);this.addEventDelegate(this._itemNavigation);this._itemNavigation.setPageSize(10)};n.prototype.exit=function(){if(this._itemNavigation){this._itemNavigation.destroy();this._itemNavigation=null}};n.prototype.onAfterRendering=function(){this._initItemNavigation()};n.prototype._setsDragAndConfiguration=function(){if(!this._iconTabHeader.getEnableTabReordering()&&this.getDragDropConfig().length){this.destroyDragDropConfig()}else if(this._iconTabHeader.getEnableTabReordering()&&!this.getDragDropConfig().length){r.setDragDropAggregations(this,"Vertical")}};n.prototype.onBeforeRendering=function(){if(!this._iconTabHeader){return}this._setsDragAndConfiguration()};n.prototype._initItemNavigation=function(){var e,t=this.getItems(),i=[];for(var r=0;r<t.length;r++){e=t[r];i.push(e.getDomRef())}this._itemNavigation.setRootDomRef(this.getDomRef());this._itemNavigation.setItemDomRefs(i)};n.prototype.getVisibleItems=function(){var e=this.getItems(),t=[],i;for(var r=0;r<e.length;r++){i=e[r];if(i.getVisible()){t.push(i)}}return t};n.prototype.setSelectedItem=function(e){if(this._selectedItem){this._deselectItem(this._selectedItem)}if(e){this._selectItem(e)}this._selectedItem=e};n.prototype.getSelectedItem=function(){return this._selectedItem};n.prototype._deselectItem=function(e){var t=e.$();if(t){t.removeClass("sapMITBSelectItemSelected");t.removeAttr("aria-selected")}};n.prototype._selectItem=function(e){var t=e.$();if(t){t.addClass("sapMITBSelectItemSelected");t.attr("aria-selected",true)}};n.prototype.ontap=function(e){var t=a(e.target);if(!t.hasClass("sapMITBSelectItem")){t=t.parent(".sapMITBSelectItem")}var i=sap.ui.getCore().byId(t[0].id);if(i&&i.getEnabled()){e.preventDefault();if(i!=this.getSelectedItem()){this._selectItem(i);this.fireSelectionChange({selectedItem:i})}}if(this._iconTabHeader){this._iconTabHeader._closeOverflow()}};n.prototype.onsapenter=n.prototype.ontap;n.prototype.onsapspace=n.prototype.ontap;n.prototype.checkIconOnly=function(e){var t,i=e.length;for(var r=0;r<i;r++){t=e[r];if(t.getText()||t.getCount()){return false}}return true};n.prototype._handleDragAndDrop=function(e){var t=e.getParameter("dropPosition"),i=e.getParameter("draggedControl"),o=e.getParameter("droppedControl"),a=i.getParent().getMetadata().getName()==="sap.m.IconTabHeader",n;if(a){n=r.getDraggedDroppedItemsFromList(this.getAggregation("items"),i,o);this._handleDropOfListAndHeaderItems(t,n.oDraggedControlFromList,n.oDroppedControlFromList,i,o._tabFilter)}else{this._handleDropOfListAndHeaderItems(t,i,o,i._tabFilter,o._tabFilter)}this._initItemNavigation();i.$().focus()};n.prototype._handleDropOfListAndHeaderItems=function(e,t,i,o,a,n){r.handleDrop(this,e,t,i,true);r.handleDrop(this._iconTabHeader,e,o,a,true);this._iconTabHeader._initItemNavigation()};n.prototype.ondragrearranging=function(e){if(!this._iconTabHeader.getEnableTabReordering()){return}var t=e.srcControl,i=e.keyCode;r.moveItem.call(this,t,i);this._initItemNavigation();t.$().focus();this._iconTabHeader._moveTab(t._tabFilter,i)};n.prototype.onsaphomemodifiers=n.prototype.ondragrearranging;n.prototype.onsapendmodifiers=n.prototype.ondragrearranging;n.prototype.onsapincreasemodifiers=n.prototype.ondragrearranging;n.prototype.onsapdecreasemodifiers=n.prototype.ondragrearranging;return n});