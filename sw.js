// 1. تعريف اسم الكاش مع رقم الإصدار (تأكد من تغيير الرقم v1 عند كل تحديث للموقع)
const CACHE_NAME = 'fg-restaurant-v2'; 

// 2. قائمة الملفات الأساسية التي ستعمل بدون إنترنت
const ASSETS = [
  '/',
  '/index.html',
  // يمكنك إضافة ملفات الـ CSS أو الأيقونات هنا
];

// مرحلة التثبيت: حفظ الملفات في الكاش
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('جاري تهيئة الكاش الجديد...');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // تفعيل السكريبت الجديد فوراً
  );
});

// مرحلة التنشيط: حذف أي كاش قديم (هذا هو التعديل الأهم)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('جاري حذف الكاش القديم:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // السيطرة على المتصفح فوراً
  );
});

// استراتيجية الاستجابة: جلب البيانات من الإنترنت أولاً لضمان حداثة الأرقام
// وفي حال انقطاع الإنترنت، يتم جلبها من الكاش
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
