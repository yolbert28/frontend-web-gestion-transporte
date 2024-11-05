import { useNavigate } from "react-router-dom";

type types = {
  url: string,
  iconClass: string,
  title: string
}

export default function Button({ url, iconClass, title }: types): JSX.Element {

  const navigate = useNavigate();

  const handlerClick = (): void => {
    navigate(url);
  }

  return <div className="item" onClick={handlerClick}>
    <p className="itemTitle">{title}</p>
    <i className={iconClass}></i>
  </div>;
}