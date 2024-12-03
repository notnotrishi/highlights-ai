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

// Function to highlight text snippets, even if they're within formatted elements
function highlightText(text) {
  function getTextNodes(node) {
    let nodes = [];
    if (node.nodeType === Node.TEXT_NODE) {
      nodes.push(node);
    } else if (node.nodeType === Node.ELEMENT_NODE && !/(script|style)/i.test(node.tagName)) {
      for (let child of node.childNodes) {
        nodes = nodes.concat(getTextNodes(child));
      }
    }
    return nodes;
  }

  const textNodes = getTextNodes(document.body);
  const searchText = text.toLowerCase();

  textNodes.forEach(node => {
    let idx;
    let nodeText = node.textContent;
    let lowerText = nodeText.toLowerCase();
    let offset = 0;

    while ((idx = lowerText.indexOf(searchText, offset)) !== -1) {
      const range = document.createRange();
      range.setStart(node, idx);
      range.setEnd(node, idx + text.length);

      const mark = document.createElement('mark');
      mark.style.backgroundColor = 'yellow';
      range.surroundContents(mark);

      offset = idx + mark.textContent.length;
      lowerText = node.textContent.toLowerCase();
    }
  });
}

// Placeholder function to generate text snippets based on email content
function getTextSnippets(subject, body) {
  // Replace this logic with your actual implementation
  return ['Hello Rishi', 'During'];
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

  const emailDetails = {
    subject: subjectElement ? subjectElement.innerText.trim() : '_NA_',
    body: bodyElement ? bodyElement.innerText.trim() : '_NA_',
  };

  // Pass subject and body to the new function
  const snippets = getTextSnippets(emailDetails.subject, emailDetails.body);

  // Highlight each snippet in the email view
  snippets.forEach(snippet => {
    highlightText(snippet);
  });

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