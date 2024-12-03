// Debugging function to log element details
function logElementDetails(element, label) {
  if (element) {
    console.log(`${label} found:`, {
      text: element.innerText,
      innerHTML: element.innerHTML,
      className: element.className
    });
  } else {
    console.log(`${label} not found`);
  }
}

function extractEmailDetails() {
  // More comprehensive selectors
  const selectors = {
    subject: [
      '.ha h2',
      'h2.hP',
      '.aH9',
      'div[role="heading"]'
    ],
    body: [
      '.a3s.aiL',
      '.a3s',
      '.ii.gt .a3s',
      'div[role="listitem"] .a3s',
      '.gs .a3s'
    ],
  };

  // Helper function to find first matching element
  function findElement(selectorList) {
    for (let selector of selectorList) {
      const element = document.querySelector(selector);
      if (element) return element;
    }
    return null;
  }

  // Extract details using the helper function
  const subjectElement = findElement(selectors.subject);
  const bodyElement = findElement(selectors.body);

  // Log element details for debugging
  // console.log('Debugging Email Extraction:');
  // logElementDetails(subjectElement, 'Subject');
  // logElementDetails(bodyElement, 'Body');

  // Construct email details object
  const emailDetails = {
    subject: subjectElement ? subjectElement.innerText.trim() : '_NA_',
    body: bodyElement ? bodyElement.innerText.trim() : '_NA_',
  };

  // Log final extracted details
  console.log('Extracted Email Details:', emailDetails);

  // Optional: Highlight body if found
  if (bodyElement) {
    bodyElement.style.backgroundColor = 'yellow';
  }

  return emailDetails;
}

extractEmailDetails();

// Add keyboard shortcut to trigger extraction
//   document.addEventListener('keydown', function(event) {
//     // Trigger on Ctrl+Shift+E
//     if (event.ctrlKey && event.shiftKey && event.key === 'E') {
//       extractEmailDetails();
//     }
//   });

// Optional: Log when script is injected
// console.log('Gmail Body Extractor script loaded');

// In your service worker (e.g., background.js)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Your fetch handling logic
    fetch(event.request)
  );
});