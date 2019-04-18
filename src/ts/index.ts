import { Sidebar } from './class/Sidebar.js';
import { Animate } from './class/Animate.js';

(function initApplication(){
    new Sidebar("#sidebarMain", "#cntSidebarMain");
    new Animate("[data-internal-link=true]", "href", 2000, "easeInOut", true);
    new Animate("[data-back-to-top=true]", "data-href", 2000);
})();