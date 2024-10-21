# Incognito Tab Saver

## Overview

Incognito Tab Saver is a Chrome extension that allows you to save and restore all open tabs in your Incognito windows. With just a couple of clicks, you can save your browsing session and restore it later, making it easy to manage your Incognito tabs.

## Features

- **Save Incognito Tabs:** Quickly save all open tabs from any Incognito window.
- **Restore Incognito Tabs:** Restore your saved tabs in a new Incognito window.
- **User-Friendly Interface:** Simple popup with clear buttons for saving and restoring tabs.
- **Persistent Storage:** Utilizes Chrome's storage API to keep your saved tabs accessible across sessions.

## Installation

1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory where the extension files are located.
5. The extension should now be installed and visible in your extension toolbar.

## Usage

1. Open an Incognito window and browse to your desired tabs.
2. Click the Incognito Tab Saver extension icon in your toolbar.
3. Click the **Save Tabs** button to store all open Incognito tabs.
4. When you're ready to restore your tabs, click the extension icon again.
5. Click the **Restore Tabs** button to reopen all saved tabs in a new Incognito window.

## How It Works

- When you click **Save Tabs**, the extension captures all URLs from currently open Incognito windows and stores them using Chrome's local storage.
- Clicking **Restore Tabs** will open a new Incognito window and create tabs for each saved URL.

## Limitations

- The extension only saves tabs from Incognito windows; tabs from regular windows are not included.
- You must have the extension installed in Incognito mode for it to function properly.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request. Any feedback, suggestions, or improvements are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

For any questions or issues, please open an issue in the repository.
