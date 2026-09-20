// Chrome Manifest V3 Background Service Worker
chrome.sidePanel
  ?.setPanelBehavior({ openPanelOnActionClick: true })
  ?.catch((error) => console.error("SidePanel setup error:", error));

chrome.runtime.onInstalled.addListener(() => {
  console.log("RFQ Bridge Extension v1.0 Installed Successfully.");
});
