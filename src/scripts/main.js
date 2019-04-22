import About from './about/about';
import Skills from './skills/skills';

const about = document.getElementById('about'),
skills = document.getElementById('skills');

if(about){
    (new About(about)).moveBackground();
}
if(skills){
    (new Skills(skills))
}

// TODO write a own service worker, without webpack


// self.addEventListener('install', function(event) {
//     console.log('installed')
//     event.waitUntil(
//       caches.open('mycache').then(function(cache) {
//         return cache.addAll([
//           'http://localhost:5000/guide',
//           'https://fonts.googleapis.com/css?family=Open+Sans',
//           'http://mongoosejs.com/docs/css/github.css',
//           'http://mongoosejs.com/docs/css/mongoose5.css',
//           'https://unpkg.com/purecss@1.0.0/build/pure-min.css',
//           'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
//         ]);
//       })
//     );
//   });
  
//   self.addEventListener('fetch', function(event) {
//     console.log('fetch', event);
  
//     return event.respondWith(
//       fetch(event.request).catch(() => caches.match(event.request.url))
//     );
//   });