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
    //   sender: [
    //     '.iw',
    //     'h3.iw',
    //     '.go .bA4',
    //     '.from .bA4',
    //     'span.bA4'
    //   ],
    //   recipients: [
    //     '.go .bA4',
    //     '.recipients .bA4',
    //     '.aR1',
    //     'span.bA4'
    //   ]
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
    // const senderElement = findElement(selectors.sender);
    // const recipientsElement = findElement(selectors.recipients);
  
    // Log element details for debugging
    console.log('Debugging Email Extraction:');
    logElementDetails(subjectElement, 'Subject');
    logElementDetails(bodyElement, 'Body');
    // logElementDetails(senderElement, 'Sender');
    // logElementDetails(recipientsElement, 'Recipients');
  
    // Construct email details object
    const emailDetails = {
      subject: subjectElement ? subjectElement.innerText.trim() : 'No subject found',
      body: bodyElement ? bodyElement.innerText.trim() : 'No body found',
    //   sender: senderElement ? senderElement.innerText.trim() : 'No sender found',
    //   recipients: recipientsElement ? recipientsElement.innerText.trim() : 'No recipients found'
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
  console.log('Gmail Body Extractor script loaded');