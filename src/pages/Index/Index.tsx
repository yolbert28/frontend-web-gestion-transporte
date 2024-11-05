import "./Index.css"

export default function Index(): JSX.Element {

  return <div className="container">
    <div className="top-image">
      <div className="with-blur"></div>
    </div>
    <div className="white-spacer">
    </div>
    <div className="info">
      <div className="info-image" >
        <img src="../../../public/persona.png" alt="camino" className="info-image-img" />
      </div>
      <div className="info-text">
        <h3 className="info-text-title" >Lorem ipsum</h3>
        <p className="info-text-paragraph" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid modi ex aliquam? Corporis nam cupiditate assumenda dicta sequi perferendis repellendus, quos sint provident, explicabo minima culpa vitae eligendi, maxime corrupti.</p>
      </div>
    </div>
    <div className="info">
      <div className="info-text m-70">
        <h3 className="info-text-title" >Lorem ipsum</h3>
        <p className="info-text-paragraph" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid modi ex aliquam? Corporis nam cupiditate assumenda dicta sequi perferendis repellendus, quos sint provident, explicabo minima culpa vitae eligendi, maxime corrupti.</p>
      </div><div className="info-image" >
        <img src="../../../public/persona.png" alt="camino" className="info-image-img" />
      </div>
    </div>
  </div>;
}