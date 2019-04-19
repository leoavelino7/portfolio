import { Sidebar } from './class/Sidebar.js';
import { AnimateScroll } from './class/AnimateScroll.js';

(function initApplication() {
    new Sidebar("#sidebarMain", "#cntSidebarMain");
    new AnimateScroll("[data-internal-link=true]", "href", 2000, 0, "easeInOut", true);
    new AnimateScroll("[data-back-to-top=true]", "data-href", 2500);
})();