// counter.js
// import React from "react";
(function () {
    class counter {
    translations = {
      en: {
        testMessage: "Hello",
      },
      fr: {
        testMessage: "Bonjour",
      },
    };
  }
    

    // export this package
    window.packages = window.packages || {};
    window.packages.counter = counter;
})();