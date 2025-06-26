sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("in.asint.task.taskm.controller.CustomerDetail", {
    onInit: function () {
      this.getOwnerComponent().getRouter()
        .getRoute("RouteCustomer")
        .attachPatternMatched(this._onRouteMatched, this); //Registers a listener for the route "RouteCustomer".
        //When the route is matched (e.g., from navTo("RouteCustomer", { CustomerID })), it calls _onRouteMatched.
        //Registers a callback function (_onRouteMatched) to be called whenever the route pattern is matched
    },

    _onRouteMatched: function (oEvent) {
      const sCustomerId = oEvent.getParameter("arguments").CustomerID;
      const sPath = "/Customers('" + sCustomerId + "')";
      this.getView().bindElement({ path: sPath });
    },

    onNavBack: function () {
      window.history.go(-1); //window.history.go(-1) is equivalent to pressing the browser’s Back button once.
    }
  });
});
