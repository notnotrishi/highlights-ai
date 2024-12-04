chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  } catch (error) {
    console.error('Failed to execute content script:', error);
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "trigger_action") {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
      }
    } catch (error) {
      console.error('Failed to execute command:', error);
    }
  }
});