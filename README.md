# Highlights AI

I am building a Chrome extension to help users quickly scan and identify key highlights in emails and web content, making content consumption and decision-making more efficient. For example, when managing my Gmail inbox, I often skim through emails to decide whether to act on them immediately, save them for later, or ignore them entirely — essentially performing inbox triage.

Most of the existing AI tools focus on summarization using language models (LLMs), but they often fall short when it comes to efficiently highlighting critical details, without losing context. Additionally, these tools frequently require sending private information to the cloud, which raises privacy concerns.

This project leverages Chrome’s built-in AI to process Gmail messages locally, extract key highlights, and visually mark them up to draw reader's attention i.e., it's essentially an assistant that reads content for you and highlights important items. While the initial focus is on Gmail, the plan is to extend the solution to other web content, such as blogs and articles, by applying the same principles and learnings from this initial version.

## Highlights AI (for Gmail)
Highlights AI for Gmail is instant spotlight on what matters, for effortless triage: key highlights marked up in your emails using private, local AI. 

This repository provides everything you need to set up and use the [Chrome Built-in AI](https://developer.chrome.com/docs/ai/built-in) and Highlights AI extension. Follow the instructions below to get started.  

---

## Prerequisites and Setup of Chrome Built-in AI  

### 1. System Requirements  
Ensure your system meets the requirements specified in the [**Built-in AI Early Preview Program documentation**](https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit?tab=t.0#heading=h.cwc2ewfrtynq).  

### 2. Download Chrome Canary (or Dev Channel)  
- Download the latest version of [Chrome Canary](https://www.google.com/chrome/canary/).  
- Refer to the [**Built-in AI Early Preview Program documentation**](https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit?tab=t.0#heading=h.witohboigk0o) for the specific version needed.  

### 3. Enable Features  
- Enable **Gemini Nano** and the **Prompt API** by following the steps outlined [here](https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit?tab=t.0#heading=h.d0qnxe57ficp).  

### 4. Relaunch Chrome  
After enabling the required features, relaunch Chrome.  

> **Note:** The setup process may take some time as the model downloads to your machine. You can follow instructions in the document linked above to test things are setup properly from Developer Tools -> Console of Chrome Canary.

---

## Download and Use the Chrome Extension for Highlights AI

### 1. Get the Extension Code  
- Download the `highlights-ai` code from this GitHub repository to your local machine.  

### 2. Load the Extension in Chrome  
1. Open **Chrome Canary**.  
2. Navigate to `chrome://extensions` in the URL bar.  
3. Enable the **Developer Mode** toggle (top-right corner).  
4. Click on **Load unpacked**.  
5. Select the folder containing the extension code from your machine.  

### 3. Using the Extension  
- Log in to Gmail and open a message in your Inbox.  
- Use the shortcut `Cmd/Ctrl + Shift + U` or click the **Highlights AI** button near the URL bar to activate the extension.  

---

## Licensing  

This project is open source and licensed under a custom non-commercial license.  
You may use it for personal, educational, or research purposes only.  

For full licensing details, see the [`LICENSE`](LICENSE) file in this repository.  

---

## Credits  

- Gmail, Chrome and Gemini are trademarks of Google LLC.
- Logo file: https://www.flaticon.com/

---

## Support  

If you encounter any issues or have feedback:  
- Create an issue in this repository.  
- Reach out on X/Twitter: [@notnotrishi](https://twitter.com/notnotrishi).  

---