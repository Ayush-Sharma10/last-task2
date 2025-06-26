/*global QUnit, sinon*/

sap.ui.define([
	"in/asint/task/taskm/controller/Detail.controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	QUnit.module("Detail Controller");

	QUnit.test("I should test the Detail controller", function (assert) {
		const oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController, "Controller instance created");
	});

	QUnit.test("Filter should apply filter to table items", function (assert) {
		const oController = new Controller();
		const sQuery = "Alfreds";

		// Fake event mock with getParameter
		const oEventMock = {
			getParameter: function (sParam) {
				if (sParam === "newValue") return sQuery;
			}
		};

		// Spy on sap.ui.model.Filter
		const filterSpy = sinon.spy(Filter.prototype, "constructor");

		// Mock binding and table
		const oBindingMock = {
			filter: function (aFilters) {
				assert.ok(aFilters.length > 0, "Filters applied");
				assert.strictEqual(aFilters[0].sPath, "CompanyName", "Correct filter path used");
				assert.strictEqual(aFilters[0].oValue1, sQuery, "Correct value passed to filter");
			}
		};

		const oTableMock = {
			getBinding: function () {
				return oBindingMock;
			}
		};

		// Stub controller.byId
		oController.byId = function () {
			return oTableMock;
		};

		// Call method
		oController.onFilterCustomers(oEventMock);

		// Cleanup
		filterSpy.restore();
	});
});
