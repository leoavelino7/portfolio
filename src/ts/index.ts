import { Sidebar } from './class/Sidebar.js';
import { BackToTop } from './class/BackToTop.js';

(function initApplication(){
    new Sidebar("sidebarMain", "cntSidebarMain");
    new BackToTop("back-to-top");
})();