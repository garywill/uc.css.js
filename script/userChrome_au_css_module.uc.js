// ==UserScript==
// @name           userChrome_au_css_module.uc.js
// @namespace      userChrome_Author_Sheet_CSS_module
// @version        1.0
// @note           Load userChrome.au.css file as author sheet
// @backgroundmodule
// ==/UserScript==

let EXPORTED_SYMBOLS = [];
(function () {
  const {Services} = ChromeUtils.import('resource://gre/modules/Services.jsm');
	let sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
  function traverseToMainProfile(str){
    let dir = Services.dirsvc.get(str,Ci.nsIFile);
    if (!dir.exists()) {
      let toAddChrome = false;
      while (dir.target.includes('chrome_debugger_profile')) {
        dir = dir.parent;
        toAddChrome = true;
      }
      if (toAddChrome) dir.append('chrome');
    }
    return dir;
  }
  const path = Services.io.getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromDir(traverseToMainProfile('UChrm'));
  try{
    sss.loadAndRegisterSheet(Services.io.newURI(path + "userChrome.au.css"), sss.AUTHOR_SHEET);
  }catch(e){
    console.error(`Could not load userChrome.au.css: ${e.name}`)
  }
})();