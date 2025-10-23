// Google Analytics и другие сниппеты для отслеживания

import { useEffect } from 'react';

// Google Analytics 4
const GoogleAnalytics = ({ measurementId = 'G-XXXXXXXXXX' }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !measurementId) return;

    // Добавляем скрипт Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(script2);

    return () => {
      // Cleanup при размонтировании
      const scripts = document.querySelectorAll(`script[src*="${measurementId}"]`);
      scripts.forEach(script => script.remove());
    };
  }, [measurementId]);

  return null;
};

// Google Tag Manager
const GoogleTagManager = ({ gtmId = 'GTM-XXXXXXX' }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !gtmId) return;

    // Добавляем скрипт GTM в head
    const script = document.createElement('script');
    script.textContent = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);

    // Добавляем noscript в body
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);

    return () => {
      // Cleanup
      const scriptToRemove = document.querySelector(`script[data-gtm="${gtmId}"]`);
      if (scriptToRemove) scriptToRemove.remove();
      const noscriptToRemove = document.querySelector(`noscript iframe[src*="${gtmId}"]`);
      if (noscriptToRemove) noscriptToRemove.parentElement.remove();
    };
  }, [gtmId]);

  return null;
};

// Facebook Pixel
const FacebookPixel = ({ pixelId = 'XXXXXXXXXXXXXXXX' }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !pixelId) return;

    const script = document.createElement('script');
    script.textContent = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Добавляем noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);

    return () => {
      // Cleanup
      const scriptToRemove = document.querySelector(`script[data-fb="${pixelId}"]`);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [pixelId]);

  return null;
};

// Yandex.Metrica
const YandexMetrica = ({ counterId = 'XXXXXXXX' }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !counterId) return;

    const script = document.createElement('script');
    script.textContent = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(${counterId}, "init", {
           clickmap:true,
           trackLinks:true,
           accurateTrackBounce:true,
           webvisor:true
      });
    `;
    document.head.appendChild(script);

    // Добавляем noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${counterId}" style="position:absolute; left:-9999px;" alt="" /></div>`;
    document.body.appendChild(noscript);

    return () => {
      // Cleanup
      const scriptToRemove = document.querySelector(`script[data-ym="${counterId}"]`);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [counterId]);

  return null;
};

// Hotjar
const Hotjar = ({ hjid = 'XXXXXXX', hjsv = '6' }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !hjid) return;

    const script = document.createElement('script');
    script.textContent = `
      (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${hjid},hjsv:${hjsv}};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const scriptToRemove = document.querySelector(`script[data-hj="${hjid}"]`);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [hjid, hjsv]);

  return null;
};

// Google Search Console верификация
const GoogleSearchConsole = ({ content = 'your-verification-code' }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !content) return;

    const updateMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    updateMetaTag('google-site-verification', content);
  }, [content]);

  return null;
};

// Bing Webmaster Tools
const BingWebmaster = ({ content = 'your-verification-code' }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !content) return;

    const updateMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    updateMetaTag('msvalidate.01', content);
  }, [content]);

  return null;
};

// Yandex Webmaster
const YandexWebmaster = ({ content = 'your-verification-code' }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !content) return;

    const updateMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    updateMetaTag('yandex-verification', content);
  }, [content]);

  return null;
};

// Cookie consent уведомление
const CookieConsent = () => {
  useEffect(() => {
    // Проверяем, дал ли пользователь согласие на cookies
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Показываем уведомление о cookies
      // Здесь можно добавить логику показа banner'а
    }
  }, []);

  return null;
};

// GDPR compliance meta
const GDPRCompliance = () => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const updateMetaTag = (name, content) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    updateMetaTag('privacy-policy', 'https://autoportbaku.com/privacy');
    updateMetaTag('terms-of-service', 'https://autoportbaku.com/terms');
  }, []);

  return null;
};

// Полный компонент аналитики
const AnalyticsProvider = ({
  children,
  gtmId,
  gaId,
  fbPixelId,
  yandexId,
  hotjarId
}) => {
  return (
    <>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {gaId && <GoogleAnalytics measurementId={gaId} />}
      {fbPixelId && <FacebookPixel pixelId={fbPixelId} />}
      {yandexId && <YandexMetrica counterId={yandexId} />}
      {hotjarId && <Hotjar hjid={hotjarId} />}
      {children}
    </>
  );
};

export {
  GoogleAnalytics,
  GoogleTagManager,
  FacebookPixel,
  YandexMetrica,
  Hotjar,
  GoogleSearchConsole,
  BingWebmaster,
  YandexWebmaster,
  CookieConsent,
  GDPRCompliance,
  AnalyticsProvider
};