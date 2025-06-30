sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("in.asint.task.taskm.controller.CustomerDetail", {
    onInit: function () {
      this.getOwnerComponent().getRouter()
        .getRoute("RouteCustomer")
        .attachPatternMatched(this._onRouteMatched, this);
    },

    _onRouteMatched: function (oEvent) {
      const sCustomerId = oEvent.getParameter("arguments").CustomerID;
      const sPath = "/Customers('" + sCustomerId + "')";
      this.getView().bindElement({ path: sPath });
    },

    onNavBack: function () {
      window.history.go(-1);
    }
  });
});
