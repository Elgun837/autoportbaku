import "../assets/styles/SectionTitle.scss";
function SectionTitle({ sectionHeadingSmall, sectionHeadingBig }) {
  return (
    <div className="section_title container">
      <div className="inner">
        <div className="section_title_small">
          <h6>{sectionHeadingSmall}</h6>
        </div>
        <div className="section_title_big">
          <h2>{sectionHeadingBig}</h2>
        </div>
      </div>
    </div>
  );
}

export default SectionTitle;
