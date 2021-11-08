/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e=sap.ui.getCore().getLibraryResourceBundle("sap.m");var n={apiVersion:2};n.render=function(n,t){var a=t.getId();n.openStart("div",t);n.class("sapMFeedInBase");n.attr("role","group");n.attr("aria-label",e.getText("FEED_INPUT_ARIA_LABEL"));n.openEnd();n.openStart("div",a+"-outerContainer");n.class("sapMFeedIn");if(!t.getShowIcon()){n.class("sapMFeedInNoIcon")}if(!t.getEnabled()){n.class("sapMFeedInDisabled")}n.openEnd();if(t.getShowIcon()){this._addImage(n,t,a)}n.openStart("div",a+"-container");n.class("sapMFeedInContainer");n.openEnd();var r=t._getTextArea();n.renderControl(r);n.renderControl(t._getPostButton());n.close("div");n.close("div");n.openStart("div",a+"-counterContainer");n.class("sapMFeedInCounter");n.openEnd();n.close("div");n.close("div")};n._addImage=function(e,n,t){e.openStart("figure",t+"-figure").class("sapMFeedInFigure");if(!n.getIcon()){e.class("sapMFeedListItemIsDefaultIcon")}e.openEnd();e.renderControl(n._getAvatar());e.close("figure")};return n},true);