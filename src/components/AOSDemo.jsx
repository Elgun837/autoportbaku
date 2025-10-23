import React from 'react';

const AOSDemo = () => {
  return (
    <div style={{ 
      padding: '50px 20px', 
      backgroundColor: '#f8f9fa',
      textAlign: 'center',
      margin: '50px 0'
    }}>
      <h2 
        data-aos="fade-down"
        data-aos-duration="800"
        data-aos-delay="200"
        data-aos-mirror="true"
        style={{ 
          fontSize: '2.5rem', 
          marginBottom: '30px',
          color: '#333'
        }}
      >
        🎭 AOS Демо с повторяющимися анимациями
      </h2>
      
      <p 
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="400"
        data-aos-mirror="true"
        style={{ 
          fontSize: '1.2rem', 
          marginBottom: '40px',
          color: '#666'
        }}
      >
        При прокрутке вверх-вниз анимации будут повторяться
      </p>

      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {[
          { name: 'Fade Left', aos: 'fade-left', delay: 600, color: '#ff6b6b' },
          { name: 'Zoom In', aos: 'zoom-in', delay: 800, color: '#4ecdc4' },
          { name: 'Slide Up', aos: 'slide-up', delay: 1000, color: '#45b7d1' },
          { name: 'Flip Left', aos: 'flip-left', delay: 1200, color: '#96ceb4' }
        ].map((item, index) => (
          <div
            key={index}
            data-aos={item.aos}
            data-aos-duration="800"
            data-aos-delay={item.delay}
            data-aos-mirror="true"
            style={{
              padding: '30px 20px',
              backgroundColor: item.color,
              color: 'white',
              borderRadius: '10px',
              minWidth: '150px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '50px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
      }}>
        <h3 
          data-aos="rotate-in"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-mirror="true"
          style={{ color: '#333', marginBottom: '20px' }}
        >
          🔄 Настройки для повторяющихся анимаций:
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          textAlign: 'left'
        }}>
          <div 
            data-aos="fade-right"
            data-aos-duration="600"
            data-aos-delay="400"
            data-aos-mirror="true"
            style={{ 
              padding: '20px',
              backgroundColor: '#f1f3f4',
              borderRadius: '8px'
            }}
          >
            <strong>once: false</strong><br/>
            <small>Анимация повторяется каждый раз</small>
          </div>
          
          <div 
            data-aos="fade-left"
            data-aos-duration="600"
            data-aos-delay="600"
            data-aos-mirror="true"
            style={{ 
              padding: '20px',
              backgroundColor: '#f1f3f4',
              borderRadius: '8px'
            }}
          >
            <strong>mirror: true</strong><br/>
            <small>Обратная анимация при выходе</small>
          </div>
          
          <div 
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="800"
            data-aos-mirror="true"
            style={{ 
              padding: '20px',
              backgroundColor: '#f1f3f4',
              borderRadius: '8px'
            }}
          >
            <strong>data-aos-mirror="true"</strong><br/>
            <small>Индивидуальная настройка элемента</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AOSDemo;