import { Outlet } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(): JSX.Element {
	return <div className="body">
		<div className="spacer"></div>
		<div className="content">
			<div className="navbar">
				<div className="logo">
					<a href="http://localhost:5173/">SafeRoute</a>
				</div>
				<nav className="bar">
					<ul className="options">
						<li>
							<a className="option" href="/units" >Inicio</a>
						</li>
						<li>
							<a className="option" href="/clients" >Servicios</a>
						</li>
						<li >
							<a className="option" href="">Sobre Nosotros</a>
						</li>
					</ul>
				</nav>
				<div className="div-buttons">
					<a href="">Iniciar Sesion</a>
					<a href="">Registrar</a>
				</div>
			</div>
			<div className="pages">
				<Outlet/>
			</div>
		</div>
	</div>;
}
