import { HeaderArea } from "./Styled";
import { Link } from 'react-router-dom';
import { isLogged, doLogout } from "../../../helpers/AuthHandler";


export default function Header(){

    let logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    }

    return(
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo1">O</span>
                        <span className="logo2">L</span>
                        <span className="logo3">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to="/account">Minha conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to="/post-ad" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged &&
                            <>
                                <li>
                                    <Link to="/signin">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Cadastro</Link>
                                </li>
                                <li>
                                    <Link to="/signin" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}