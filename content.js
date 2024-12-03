// Debugging function to log element details
function logElementDetails(element, label, logType = 'all') {
  if (element) {
    const details = {};
    if (logType === 'text' || logType === 'all') {
      details.text = element.innerText;
    }
    if (logType === 'html' || logType === 'all') {
      details.innerHTML = element.innerHTML;
    }
    if (logType === 'all') {
      details.className = element.className;
    }
    console.log(`${label} found:`, details);
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

// Placeholder function to generate text snippets based on email content using AI
async function getTextSnippets(subject, body) {
  try {
    // Check AI model availability
    const {available, defaultTemperature, defaultTopK, maxTopK} = 
      await ai.languageModel.capabilities();
    
    // console.log('AI model availability:', available);
    if (available === "no") {
      console.log("AI model not available, using default snippets");
      return ['_NA_'];
    }

    // Create AI session
    const session = await ai.languageModel.create({
      temperature: 1.0,
      topK: 3,
    });
    
    // Prompt to analyze email content
    const prompt = `
    Extract up to 3 of the most important and meaningful fragments or sentences from this email. 
    - The snippets should make sense even if they are not complete sentences.
    - Focus only on action items for the user, deadlines, key decisions, or critical details.
    - Ignore greetings, signatures, disclaimers, or other standard footer content.
    - Do not format the response in any way—no bullets, numbers, or additional symbols in the beginning or the end.
    - Do not change the capitalization, punctuation, or wording of the original text.
    
    Subject: ${subject}
    Body: ${body}
    
    Only return the extracted phrases exactly as they appear in the email, without adding any other formatting to the response.
    `;
    
    const result = await session.prompt(prompt);
    
    // Convert AI response to array of snippets
    const snippets = result
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    console.log(snippets);
    session.destroy();
    return snippets.length > 0 ? snippets : ['_NA_'];
    
  } catch (error) {
    console.error('Error generating snippets:', error);
    return ['_NA_']; 
  }
}

// Make extractEmailDetails async
async function extractEmailDetails() {
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

  logElementDetails(subjectElement, 'Subject element', 'text');
  logElementDetails(bodyElement, 'Body element', 'text');
  
  const emailDetails = {
    subject: subjectElement ? subjectElement.innerText.trim() : '_NA_',
    body: bodyElement ? bodyElement.innerText.trim() : '_NA_',
  };

  const snippets = await getTextSnippets(emailDetails.subject, emailDetails.body);

  snippets.forEach(snippet => {
    highlightText(snippet);
  });

  return emailDetails;
}

// Add console log to verify script loading
// console.log('Content script loaded');

// Update the function call with more detailed logging
// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded fired');
  
//   extractEmailDetails()
//     .then(details => {
//       console.log('Email details extracted successfully:', details);
//     })
//     .catch(error => {
//       console.error('Error processing email:', error);
//     });
// });

// Add immediate execution as backup
// console.log('Attempting immediate execution');
extractEmailDetails()
  .then(details => {
    console.log('Email details extracted (immediate):', details);
  })
  .catch(error => {
    console.error('Error processing email (immediate):', error);
  });