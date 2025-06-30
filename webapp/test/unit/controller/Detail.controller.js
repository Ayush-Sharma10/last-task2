sap.ui.define([
	"in/asint/task/taskm/controller/Detail.controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	QUnit.module("Detail Controller");
	//Ye line ensure karti hai ki controller class sahi se load ho rahi hai aur uspe operations kiye ja sakte hain.
	QUnit.test("I should test the Detail controller", function (assert) {    //assert object use hota hai check karne ke liye ki expected condition sahi hai ya nahi.
		const oAppController = new Controller();
		oAppController.onInit(); //Ye line controller ke onInit() method ko manually call karti hai.
		assert.ok(oAppController, "Controller instance created"); //QUnit ka ek assertion method hai jo check karta hai ki jo value
		// di gayi hai wo truthy (non-null, non-undefined) hai ya nahi.
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
		const filterSpy = sinon.spy(Filter.prototype, "constructor"); //Sinon is a JavaScript testing library

		// Mock binding and table
		const oBindingMock = {
			filter: function (aFilters) {
				assert.ok(aFilters.length > 0, "Filters applied"); //Check karta hai ki filter apply hua hai (khaali nahi hai)
				assert.strictEqual(aFilters[0].sPath, "CompanyName", "Correct filter path used");//Check karta hai ki filter kis property pe apply hua — yahan "CompanyName"
				assert.strictEqual(aFilters[0].oValue1, sQuery, "Correct value passed to filter");//Check karta hai ki filter mein value kya di gayi thi — sQuery (jo user ne search box mein type kiya)
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

		// Cleanup our spyyyy
		filterSpy.restore(); //Sinon spy ko restore karta hai taaki wo Filter constructor pe further interfere na kare.
	});
});
