// Content script to listen to Gmail/Outlook DOM events
console.log("RFQ Bridge Content Script Active.");

window.addEventListener("message", (event) => {
  if (event.data?.type === "RFQ_BRIDGE_DOM_CAPTURE") {
    console.log("Captured active email DOM payload.");
  }
});

