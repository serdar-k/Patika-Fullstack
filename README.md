# Patika-Fullstack

## Kullanılan Teknolojiler, Kütüphaneler ve Araçlar

## Backend
* Java 17
* Spring Boot 3
* Spring Security 6
* JWT

## Frontend
* ### React

* ### Styled Components
  Javascript (.js ya da .jsx) dosyası içerisinde, komponent bazlı CSS kodları yazmaya imkan sağlayan bir araç. Ayrıntılı bilgi -> [Styled Components](https://styled-components.com/)
  
* ### React Router
  React ile "Single Page Application" tipinde uygulamalar geliştirirken kullanılan popüler bir araçtır. SPA tipi uygulamalarda "routing (yönlendirme)" işlemi backend tarafından değil "client (kullanıcı)" tarafından gerçekleştirilir. Ayrıntılı bilgi -> [React Router](https://reactrouter.com/en/main)

* ### React Hook Form
  Form yönetimini kolaylaştıran ve geliştiricinin her bir form girişi için daha az ancak daha performanslı kod yazmasını sağlayan bir kütüphanedir. Ayrıntılı bilgi -> [React Hook Form](https://react-hook-form.com/)
  
* ### React Icons
  React uygulamalarında kullanılabilecek geniş içerikli bir ikon aracıdır. Ayrıntılı bilgi -> [React Icons](https://react-icons.github.io/react-icons/)
  
* ### React Hot Toast
  Kullanıcı deneyimini artırmaya yönelik bir bildirim aracıdır. Ayrıntılı bilgi -> [React Hot Toast](https://react-hot-toast.com/)

* ### React Query
  "Remote State" yönetimi için kullanılan bir araçtır. Remote State, UI'da tutulmayan ancak sunucu tarafında tutulan ve uygulamanın sunucuya HTTP isteği yaparak ulaşabileceği state yapılarına verilen isimdir. React Query, state verilerini sunucudan alırken yapılabilecek asenkron işlemleri veya önbellekleme işlemleri gibi karmaşık işlemleri kendi içerisinde gerçekleştirerek geliştiriciye kolaylık sağlar. Ayrıntılı bilgi -> [React Query](https://tanstack.com/query/v3/)

* ### React Context API
  React uygulaması içerisinde state yönetimi araçlarından biridir. Global olarak tanımlanan state yapılarının uygulama genelinde kullanılabilmesini sağlar ve "prop drilling" denen uygulamanın önüne geçer. Ayrıntılı bilgi -> [React Context API](https://react.dev/reference/react/useContext)

## Uygulamada bulunan eksiklikler
### Refresh Token
Kullanıcının belirli bir süre sonunda, backend'e istek yapabilmesi için oturum açtığında kullandığı "access token" yapısının "refresh token" yardımı ile yenilenmesi gerekir.
