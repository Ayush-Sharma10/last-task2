sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter",
  "in/asint/task/taskm/util/formatter"
], function (Controller, Filter, FilterOperator, Sorter, formatter) {
  "use strict";

  return Controller.extend("in.asint.task.taskm.controller.Detail", {
    formatter: formatter,

    onInit: function () {
      this._lightTheme = "sap_fiori_3";
      this._darkTheme = "sap_fiori_3_dark";

      const oVizFrame = this.byId("idVizFrame");
      if (oVizFrame && oVizFrame.setVizProperties) {
        oVizFrame.setVizProperties({
          title: {
            visible: false
          }
        });
      }
    },

    onFilterCustomers: function (oEvent) {
      const query = oEvent.getParameter("newValue");
      const table = this.byId("customerTable");
      const binding = table.getBinding("items");

      if (query) {
        const filters = [
          new Filter("CompanyName", FilterOperator.Contains, query)
        ];
        binding.filter(filters);
      } else {
        binding.filter([]);
      }
    },

    onSortCustomers: function (oEvent) {
      const selectedKey = oEvent.getSource().getSelectedKey();
      const table = this.byId("customerTable");
      const binding = table.getBinding("items");

      const sorter = new Sorter(selectedKey, false);
      binding.sort(sorter);
    },

    onToggleTheme: function () {
      const current = sap.ui.getCore().getConfiguration().getTheme();
      const newTheme = current === this._lightTheme ? this._darkTheme : this._lightTheme;
      sap.ui.getCore().applyTheme(newTheme);
    },

    onCustomerPress: function (oEvent) {
      const oItem = oEvent.getSource();
      const context = oItem.getBindingContext();
      const sCustomerId = context.getProperty("CustomerID");

      this.getOwnerComponent().getRouter().navTo("RouteCustomer", {
        CustomerID: sCustomerId
      });
    },

    onGroupByCountry: function () {
      const table = this.byId("customerTable");
      const binding = table.getBinding("items");

      const groupSorter = new Sorter("Country", false, function (oContext) {
        return {
          key: oContext.getProperty("Country"),
          text: oContext.getProperty("Country")
        };
      });
      binding.sort(groupSorter);
    }
  });
});
