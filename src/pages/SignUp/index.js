import { useState, useEffect } from 'react'
import { PageArea } from './styled'
import { PageContainer, PageTittle, ErrorMessage } from '../../components/mainComponents'
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

export default function Page(){

    const api = useApi();

    const [name, setName] = useState('');
    const [estado, setEstado] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const [stateList, setStateList] = useState([]);

    useEffect(()=>{
        const getStates = async () => {
            const list = await api.getStates()
            setStateList(list);
        }
        getStates();
        // eslint-disable-next-line
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirm){
            setError("A senhas não são iguais")
            setDisabled(false);
            return;
        }

        const json = await api.register(name, email, password, estado);

        if(json.error){
            setError(json.error)
        }else{
            doLogin(json.token);
            window.location.href = "/";
        }

        setDisabled(false);
    }

    return(
        <PageContainer>
            <PageTittle>Cadastro</PageTittle>
            <PageArea>
                {error > 0 &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className="area-tittle">Nome Completo</div>
                        <div className="area-input">
                            <input
                                type="text" 
                                disabled={disabled}
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Estado</div>
                        <div className="area-input">
                            <select value={estado} onChange={(e)=>setEstado(e.target.value)} required>
                                <option></option>
                                {stateList.map((i, k) => 
                                    <option key={k} value={i.idstate}>{i.dsstate}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Email</div>
                        <div className="area-input">
                            <input
                                type="email" 
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Senha</div>
                        <div className="area-input">
                            <input 
                                type="password" 
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Confirmar Senha</div>
                        <div className="area-input">
                            <input 
                                type="password" 
                                disabled={disabled}
                                value={confirm}
                                onChange={e=>setConfirm(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}