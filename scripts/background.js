// Update the icon or badge when content scripts require.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "update_icon") {
    chrome.action.setIcon({
      path: message.iconPath,
      tabId: sender.tab.id,
    });
  }

  if (message.action === "update_badge") {
    chrome.action.setBadgeText({
      text: message.badgeText > 0 ? message.badgeText : "",
      tabId: sender.tab.id,
    });
  }

  return true;
});
