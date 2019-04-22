import { Sidebar } from './class/Sidebar.js';
import { AnimateScroll } from './class/AnimateScroll.js';
import { ScrollSpy } from './class/ScrollSpy.js';

(function initApplication() {
    new Sidebar("#sidebarMain", "#cntSidebarMain", "#wall");
    new AnimateScroll("[data-back-to-top=true]", "data-href", 2500);
    new AnimateScroll("[data-internal-link=true]", "href", 2000, 0, "easeInOut", true);
    new ScrollSpy(".scrollspy");
})();