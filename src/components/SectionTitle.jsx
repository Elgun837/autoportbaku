import "../assets/styles/SectionTitle.scss";
function SectionTitle({ sectionHeadingSmall, sectionHeadingBig }) {
  return (
    <section className="section_title ">
      <div className="container">
        <div className="row">
          <div className="inner">
            <div className="section_title_small">
              <h4>{sectionHeadingSmall}</h4>
            </div>
            <div className="section_title_big">
              <h2>{sectionHeadingBig}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionTitle;
