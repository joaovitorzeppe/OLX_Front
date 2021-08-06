import { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { PageArea, Fake } from './styled';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/mainComponents';
import useApi from '../../helpers/OlxAPI';

export default function Page(){

    const api = useApi();
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState({});

    useEffect(()=>{
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            setAdInfo(json)
            setLoading(false)
        }
        getAdInfo(id);
    },[])

    const formatDate = (date) => {
        let cdate = new Date(date);
        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setenbro', 'outubro', 'novembro', 'dezenbro']
    
        let cday = cdate.getDate();
        let cmonth = cdate.getMonth();
        let cyear = cdate.getFullYear();

        return `${cday} de ${months[cmonth]} de ${cyear}`
    }

    return(
        <PageContainer>
            <PageArea>
                <div className='leftSide'>
                    <div className='box'>
                        <div className='adImg'>
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img,k)=>
                                        (<div key={k} className='each-slide'>
                                            <img src={img} alt=""/>
                                        </div>)
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className='adInfo'>
                            <div className='adName'>
                                {loading && <Fake height={20} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated && 
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className='adDescription'>
                                {loading && <Fake height={100}/>}
                                {adInfo.description}
                                <hr/>
                                {adInfo.views && 
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='box box-padding'>
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable && 
                            "Preço Negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">Preço: <span>R$ {adInfo.price}</span></div>
                        }
                    </div>
                    {loading && <Fake height={50} />}
                    {adInfo.userInfo && 
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} className="contactSeller" target="_blank">Fale com o vendedor</a>
                            <div className='created-by box box-padding'>
                                Criado por:
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                            </div>
                        </>
                    }
                </div>
            </PageArea>
        </PageContainer>
    )
}