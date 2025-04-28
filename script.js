function showLogin(){document.getElementById("login-form").style.display="flex",document.getElementById("register-form").style.display="none"}function showRegister(){document.getElementById("login-form").style.display="none",document.getElementById("register-form").style.display="flex"}function closeModal(){document.getElementById("login-form").style.display="none",document.getElementById("register-form").style.display="none"}let users={};function register(){let e=document.getElementById("register-username").value,l=document.getElementById("register-email").value,s=document.getElementById("register-password").value;e&&l&&s?(users[e]={email:l,password:s},alert("Registration successful"),closeModal()):alert("Please fill out all fields.")}function login(){let e=document.getElementById("login-username").value,l=document.getElementById("login-password").value;users[e]&&users[e].password===l?(alert("Login successful"),closeModal()):alert("Invalid credentials.")}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
  
          return fetch(event.request)
            .then((response) => {
              // Check if the response is valid
              if (!response || response.status !== 200) {
                return response; // Do not cache invalid responses
              }
  
              // Clone and cache the valid response
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseToCache));
  
              return response;
            })
            .catch(() => {
              // Return a fallback (e.g., offline page) for failed requests
              return caches.match('/offline.html');
            });
        })
    );
  });