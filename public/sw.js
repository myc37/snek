if(!self.define){let e,n={};const i=(i,s)=>(i=new URL(i+".js",s).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(n[c])return;let r={};const o=e=>i(e,c),t={module:{uri:c},exports:r,require:o};n[c]=Promise.all(s.map((e=>t[e]||o(e)))).then((e=>(a(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/AppIcons.zip",revision:"687b93719d76bd4479e879fd1e029abb"},{url:"/_next/static/IlCP0FsN-BSzaNfNPcxDS/_buildManifest.js",revision:"da5c62efa9c92cfb59de5615dcf53ac7"},{url:"/_next/static/IlCP0FsN-BSzaNfNPcxDS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1a48c3c1-612a2f55fd8521c6.js",revision:"612a2f55fd8521c6"},{url:"/_next/static/chunks/332-9b5cbccf15fd5117.js",revision:"9b5cbccf15fd5117"},{url:"/_next/static/chunks/534-c4aa068ac1826595.js",revision:"c4aa068ac1826595"},{url:"/_next/static/chunks/54c66987-62f2f03e3b090c1e.js",revision:"62f2f03e3b090c1e"},{url:"/_next/static/chunks/587-273daafc80b3beea.js",revision:"273daafc80b3beea"},{url:"/_next/static/chunks/597-edd45767843bbc97.js",revision:"edd45767843bbc97"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-400e9ac6681c82cc.js",revision:"400e9ac6681c82cc"},{url:"/_next/static/chunks/pages/_app-eafb07877632b926.js",revision:"eafb07877632b926"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/admin-4286db3dd12292cf.js",revision:"4286db3dd12292cf"},{url:"/_next/static/chunks/pages/earnings-c2ba202277bb8303.js",revision:"c2ba202277bb8303"},{url:"/_next/static/chunks/pages/index-ecd8f93f2b4e2cd3.js",revision:"ecd8f93f2b4e2cd3"},{url:"/_next/static/chunks/pages/orders-eb29a104b6c265a5.js",revision:"eb29a104b6c265a5"},{url:"/_next/static/chunks/pages/quests-2a281e4b87021296.js",revision:"2a281e4b87021296"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6ef43a8d4a395f49.js",revision:"6ef43a8d4a395f49"},{url:"/_next/static/css/6791a824c1f4a466.css",revision:"6791a824c1f4a466"},{url:"/_next/static/media/inter-all-400-normal.2ae8ed37.woff",revision:"2ae8ed37"},{url:"/_next/static/media/inter-cyrillic-400-normal.5122dff0.woff2",revision:"5122dff0"},{url:"/_next/static/media/inter-cyrillic-ext-400-normal.06b6faa3.woff2",revision:"06b6faa3"},{url:"/_next/static/media/inter-greek-400-normal.d1deb2fe.woff2",revision:"d1deb2fe"},{url:"/_next/static/media/inter-greek-ext-400-normal.2271c2a1.woff2",revision:"2271c2a1"},{url:"/_next/static/media/inter-latin-400-normal.493934f7.woff2",revision:"493934f7"},{url:"/_next/static/media/inter-latin-ext-400-normal.261aa6d4.woff2",revision:"261aa6d4"},{url:"/_next/static/media/inter-vietnamese-400-normal.ebde713a.woff2",revision:"ebde713a"},{url:"/favicon.ico",revision:"953a5ad23cbb18c0ddf9e0728b479c07"},{url:"/favicon/android-chrome-192x192.png",revision:"6ba29246f8abbba2cfa37bdb023e0432"},{url:"/favicon/android-chrome-512x512.png",revision:"a8e742eafa5b129ab9293cc5fc32b3dd"},{url:"/favicon/apple-touch-icon.png",revision:"98bf18ba4490a7d701dd4389fb7cbe5d"},{url:"/favicon/favicon-16x16.png",revision:"b4d12c1fca76e4657eaaf10bd76fb33f"},{url:"/favicon/favicon-32x32.png",revision:"d3e8a4bf9a1222a7db4b0448744e4b93"},{url:"/favicon/favicon.ico",revision:"953a5ad23cbb18c0ddf9e0728b479c07"},{url:"/favicon/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/golden-star.png",revision:"9b4e919a5ebfc7413d90551ab522f679"},{url:"/icons/100.png",revision:"28994e199b27ee79a724faa72ecd1a96"},{url:"/icons/102.png",revision:"d30d9b887e9997b394f9763c50f980d0"},{url:"/icons/1024.png",revision:"1d94ab58b35a3b4a6abdff064b3b8ff6"},{url:"/icons/114.png",revision:"36d5d0072fdade628341f5283fdc09c2"},{url:"/icons/120.png",revision:"a93831f135fada7a3dd27da45cd7f1c6"},{url:"/icons/128.png",revision:"d8fb456060a46460e7a9b448222ff161"},{url:"/icons/144.png",revision:"3ee7a6292d20c3a5e1132b9e384cbe6d"},{url:"/icons/152.png",revision:"4995788206eb42af8565e567c68db010"},{url:"/icons/16.png",revision:"f00373c733bfc7c2f62cebb85c2a8597"},{url:"/icons/167.png",revision:"b1c10cfb85881e7cb611817062499f60"},{url:"/icons/172.png",revision:"0344e7f8803d925c4c4280b131377db1"},{url:"/icons/180.png",revision:"f1f5932eb62356131768e000e57bb292"},{url:"/icons/196.png",revision:"6d4a9bd609b198fef09eb869391a5b7e"},{url:"/icons/20.png",revision:"c85c12c6a3a0b421c0ac1f22d8f4816d"},{url:"/icons/216.png",revision:"cc9cbb2e478cd6272288adc87611ebec"},{url:"/icons/256.png",revision:"5390ab14d86ba737b82d80d44230ae82"},{url:"/icons/29.png",revision:"c2e947762ec8424185f2f46e2350386b"},{url:"/icons/32.png",revision:"c84d5b2c38268e4078c8b21e2521eefb"},{url:"/icons/40.png",revision:"f95c61dba792296730c4e0482ef3ebbb"},{url:"/icons/48.png",revision:"80fb1e466780be974a732c70095dd379"},{url:"/icons/50.png",revision:"116efce23b21db7aeddc484632173203"},{url:"/icons/512.png",revision:"a8e742eafa5b129ab9293cc5fc32b3dd"},{url:"/icons/55.png",revision:"f914343756910544711da6f082e4e099"},{url:"/icons/57.png",revision:"45b20981b5583cec324a9a28a055703f"},{url:"/icons/58.png",revision:"5a903d32bc5029f34130fad1d4392432"},{url:"/icons/60.png",revision:"22f7272c5566fd0d69878b86b1f7b5e9"},{url:"/icons/64.png",revision:"84ffca65780312b8e1ca4417dc5fa43c"},{url:"/icons/66.png",revision:"bde875f4d37e05412de6894c6639f616"},{url:"/icons/72.png",revision:"726b54ebdec54407e5d2eef202522845"},{url:"/icons/76.png",revision:"77dd65f22b34fe7468caf647b3b7182d"},{url:"/icons/80.png",revision:"269c08ea1d3f02a937908c0589c1f679"},{url:"/icons/87.png",revision:"56a418398f58a15d7d2a8ee51376e3ca"},{url:"/icons/88.png",revision:"f2332f8c39290b61ebe80974b34a5db1"},{url:"/icons/92.png",revision:"17a8bc71cfd587ee71419909b62feb66"},{url:"/icons/Contents.json",revision:"62476f31fa1c8e76733c2e1fd6fd22e4"},{url:"/icons/maskable_icon.png",revision:"856c235319c0ffe2a7fd4c2627ac7978"},{url:"/manifest.json",revision:"76ff0fe90d0b419a8f48e44c192730fe"},{url:"/ninja-error.png",revision:"e88059cbbc13ebb65ee182ebd6422c3c"},{url:"/ninja-loading.png",revision:"29240ec1373fa99414005572493908ca"},{url:"/ninja-money.png",revision:"d23377b0bb0a4e57100218d382ee0201"},{url:"/ninja-thumbs.png",revision:"16490a9304e4aa75deb5e8588ac30863"},{url:"/ninja-van.png",revision:"feb539eca3b013d67ace9e76825c9c01"},{url:"/nv-logo.png",revision:"8bad7e1d148f246534b0c24391f5af4b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:i,state:s})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));