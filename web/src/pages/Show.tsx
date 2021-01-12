import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom"
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/pages/show.css";
import editIcon from "../styles/icons/edit-24px.svg";

interface WishListData {
    _id?: string,
    name?: string,
    imageURL?: string,
    economy?: number,
    productPrice?: number,
    timeForAdd?: number
}

interface wishlistParams {
    id: string;
}


function convertMoney(value: any) {
    return value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value / 100);
}



function Show() {
    const params = useParams<wishlistParams>();
    const [data, setData] = useState<WishListData>();
    const history = useHistory();

    useEffect(() => {
        api.get(`wishilist/show/${params.id}`).then(response => setData(response.data.data));
    }, []);

    function editItem() {
        history.push(`/wishlist/edit/${params.id}`)
    }

    return (
        <main>
            <Navbar />
            <div className="show">
                <div onClick={editItem} className="editIcon">
                    <img src={editIcon} alt="edit item" />
                </div>
                <div className="productName">
                    <p>{data?.name}</p>
                </div>
                <div className="showImage">
                    <img src={data?.imageURL} alt={`imagem de ${data?.name}`} />
                </div>
                <div>
                    <span>Sua economia mensal é de: </span>
                    <span>{convertMoney(data?.economy)}</span>
                </div>
                <div>
                    <span>O produto custa: </span>
                    <span>{convertMoney(data?.productPrice)}</span>
                </div>
                <div>
                    <p>Faltam <span>{data?.timeForAdd}</span> meses economizando para adquirir o produto</p>
                </div>
            </div>
        </main>

    );
}

export default Show;            