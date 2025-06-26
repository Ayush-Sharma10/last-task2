sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter"
], function (Controller, Filter, FilterOperator, Sorter) {
  "use strict";

  return Controller.extend("in.asint.task.taskm.controller.Detail", {
    onInit: function () {
  this._lightTheme = "sap_fiori_3";
  this._darkTheme = "sap_fiori_3_dark";

  // Wait for VizFrame to load and set properties
  this.byId("idVizFrame").setVizProperties({
    title: {
      visible: false
    }
  });
},

    onFilterCustomers: function (oEvent) {
      const query = oEvent.getParameter("newValue");
      const table = this.byId("customerTable");
      const binding = table.getBinding("items");

      if (query) {
        const filters = [
          new Filter("CompanyName", FilterOperator.Contains, query) //The filter is wrapped in an array because filter() expects an array of filters.
        ];
        binding.filter(filters);
      } else {
        binding.filter([]); //If no query was entered (i.e., the user cleared the input), it resets the filter. Passing an empty array removes all filters, so the full list is shown again.
      }
    },

    onSortCustomers: function (oEvent) {
      const selectedKey = oEvent.getSource().getSelectedKey(); //.getSelectedKey() gets the key of the currently selected item from the dropdown.
      const table = this.byId("customerTable");
      const binding = table.getBinding("items");

      const sorter = new Sorter(selectedKey, false); //false means ascending order. If you wanted descending, you'd pass true.
      binding.sort(sorter);
    },

    onToggleTheme: function () {
      const current = sap.ui.getCore().getConfiguration().getTheme(); //accesses the global UI5 core and getConfiguration().getTheme() returns the current theme string
      const newTheme = current === this._lightTheme ? this._darkTheme : this._lightTheme;
      sap.ui.getCore().applyTheme(newTheme);
    },

    onCustomerPress: function (oEvent) {
      const oItem = oEvent.getSource();
      const context = oItem.getBindingContext();
      const sCustomerId = context.getProperty("CustomerID");

      this.getOwnerComponent().getRouter().navTo("RouteCustomer", {  //Retrieves the router from the component using getOwnerComponent().
        CustomerID: sCustomerId
      });
    }
  });
});
