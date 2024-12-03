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
      mark.style.backgroundColor = 'pink';
      range.surroundContents(mark);

      offset = idx + mark.textContent.length;
      lowerText = node.textContent.toLowerCase();
    }
  });
}

// Placeholder function to generate text snippets based on email content
function getTextSnippets(subject, body) {
  return ['Client Packs', 'During'];
}

function extractEmailDetails() {
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

  function findElement(selectorList) {
    for (let selector of selectorList) {
      const element = document.querySelector(selector);
      if (element) return element;
    }
    return null;
  }

  const subjectElement = findElement(selectors.subject);
  const bodyElement = findElement(selectors.body);

  const emailDetails = {
    subject: subjectElement ? subjectElement.innerText.trim() : '_NA_',
    body: bodyElement ? bodyElement.innerText.trim() : '_NA_',
  };

  const snippets = getTextSnippets(emailDetails.subject, emailDetails.body);

  snippets.forEach(snippet => {
    highlightText(snippet);
  });

  return emailDetails;
}

// Call extractEmailDetails when the script is executed
extractEmailDetails();