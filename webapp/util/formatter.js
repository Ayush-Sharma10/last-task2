sap.ui.define([], function () {
  "use strict";
  return {
    countryEmoji: function (sCountry) {
      const flagMap = {
        "Germany": "🇩🇪",
        "UK": "🇬🇧",
        "Mexico": "🇲🇽",
        "France": "🇫🇷",
        "Sweden": "🇸🇪",
        "Canada": "🇨🇦",
        "Spain": "🇪🇸",
        "USA": "🇺🇸",
        "Italy": "🇮🇹",
        "Brazil": "🇧🇷",
        "Finland": "🇫🇮",
        "Poland": "🇵🇱",
        "Denmark": "🇩🇰",
        "Belgium": "🇧🇪",
        "Norway": "🇳🇴",
        "Switzerland": "🇨🇭",
        "Portugal": "🇵🇹",
        "Austria": "🇦🇹",
        "Argentina": "🇦🇷",
        "Venezuela": "🇻🇪",
        "Ireland": "🇮🇪"
      };

      return `${flagMap[sCountry] || ""} ${sCountry}`; // template literal
      // Ye check karta hai ki sCountry (jaise "India") ke liye koi flag emoji flagMap mein hai ya nahi.
    }
  };
});
