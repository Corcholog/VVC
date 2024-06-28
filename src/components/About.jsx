import React from 'react';

const AboutNosotros = () => {
  return (
    <section className="quienes-somos">
      <div className="quienes-somos-container">
        <h2 className="quienes-somos-title">Quiénes Somos</h2>
        <div className="quienes-somos-content">
          <div className="quienes-somos-text">
            <p>
              Somos una empresa comprometida con la innovación y la excelencia. Nuestro equipo está formado por profesionales apasionados por crear soluciones que transformen el mundo digital.
            </p>
            <p>
              En nuestro día a día, nos esforzamos por ofrecer productos y servicios que superen las expectativas de nuestros clientes, siempre buscando la mejor manera de impactar positivamente en la sociedad.
            </p>
          </div>
          <div className="quienes-somos-image">
            <img src="/public/img/Carpincho_Rabioso.png" alt="Equipo de la empresa" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutNosotros;
