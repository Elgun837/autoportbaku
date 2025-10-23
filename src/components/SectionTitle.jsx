import "../assets/styles/SectionTitle.scss";
function SectionTitle({ sectionHeadingSmall, sectionHeadingBig }) {
  return (
    <section className="section_title ">
      <div className="container">
        <div className="row">
          <div className="inner">
            <div className="section_title_small">
              <h4
               data-aos="fade-up"
               data-aos-delay="200"
               data-aos-duration="800"
               data-aos-mirror="true"
              >{sectionHeadingSmall}</h4>
            </div>
            <div className="section_title_big">
              <h2
               data-aos="fade-up"
               data-aos-delay="300"
               data-aos-duration="800"
               data-aos-mirror="true"
              >{sectionHeadingBig}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionTitle;
