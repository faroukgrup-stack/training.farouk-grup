// ---- كود الحماية ومنع الوصول لأدوات المطور ----
(function () {
  "use strict";

  // منع F12 واختصارات أدوات المطور وعرض المصدر
  document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I / J / C
    if (e.ctrlKey && e.shiftKey &&
        (e.key === 'I' || e.key === 'i' ||
         e.key === 'J' || e.key === 'j' ||
         e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (عرض المصدر)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      return false;
    }
  }, true);

  // منع النقر بزر الماوس الأيمن (بدون alert)
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  }, true);

})();
// ---- نهاية كود الحماية ----
