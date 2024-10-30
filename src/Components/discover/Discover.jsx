
import "./Discover.css";
import FormMs from "../morttgage/FormMS";
export default function Discover() {
  return (
    <div className="Discover">
      <div className="body-img">

        <div className="grop-title1">
          <div className="img-dis">
            <img src="./uploads/img/marpa.png" alt="" />
          </div>
          <div className="title-dis3">
            <h2>DISCOVER</h2>
            <h3>SEATTLE & MIDDLE EAST GROUP</h3>
          </div>
        </div>

        <div className="prgraf">
        <p>
    Seattle & Middle East Group is a leader in providing
    <br class="small-screen-hide" />
      {`  `}exceptional professional services across real estate,
    <br class="small-screen-hide" /> travel, contracting, mortgage, and digital marketing.
    <br class="small-screen-hide" />
    {`  `}We are committed to delivering tailored solutions that {`  `}
    <br class="small-screen-hide" />
    {`  `} meet the unique needs of our clients.
    <br />
    <br/>
    {`  `} Our expert team in real estate helps you find ideal
    <br class="small-screen-hide" /> residential, commercial, or investment properties.
    <br class="small-screen-hide" />
    {`  `} Our travel services offer seamless and memorable journeys,
    <br class="small-screen-hide" /> while our mortgage team provides comprehensive financing guidance.
    <br class="small-screen-hide" />
    {`  `}Our digital marketing agency boosts your brand's online presence
    <br class="small-screen-hide" /> with cutting-edge strategies.
    <br />
    <br  />
    {`  `}Professionalism, integrity, and customer satisfaction are our core values.
    <br class="small-screen-hide" />
</p>
        </div>

        <FormMs />
        <br />
        <br />
      </div>
    </div>
  );
}
