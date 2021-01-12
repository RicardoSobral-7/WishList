import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, useHistory } from "react-router-dom"
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/pages/edit.css";

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




function Edit() {
    const params = useParams<wishlistParams>();
    const [dataWishlist, setData] = useState<WishListData>()
    const [productName, setProductName] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [economy, setEconomy] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const history = useHistory();

    function convertMoney(value: any) {
        return value = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value / 100);
    }

    useEffect(() => {
        api.get(`wishilist/show/${params.id}`).then(response => {
            setData(response.data.data)
            setEconomy(convertMoney(response.data.data.economy));
            setProductPrice(convertMoney(response.data.data.productPrice));
        });
    }, []);

    async function updateItem(event: FormEvent) {
        event.preventDefault();
        const economyFormated = economy.replace(/\D/g, "");
        const productPriceFormatted = productPrice.replace(/\D/g, "");
        let data = {
            id: params.id,
            name: productName || dataWishlist?.name,
            imageURL: imageURL || dataWishlist?.imageURL,
            economy: economyFormated || dataWishlist?.economy,
            productPrice: productPriceFormatted || dataWishlist?.productPrice
        }
        await api.put("wishlist", data);
        alert("Atualização realizada com sucesso!");
        history.push(`/wishlist/show/${params.id}`);
    }

    async function removeItem(event: FormEvent) {
        const confirmation = window.confirm("Deseja Deletar?");
        if (!confirmation) {
            event.preventDefault();
        } else {
            const config = {
                data: {
                    id: params.id
                }
            }
            await api.delete("wishlist", config);
            history.push("/");
        }
    }


    return (
        <main>
            <Navbar />
            <div className="forms">
                <form id="formUpdate" onSubmit={updateItem}>
                    <div>
                        <label htmlFor="productName">Nome do Produto</label>
                        <input onChange={event => setProductName(event.target.value)} type="text" id="productName" defaultValue={dataWishlist?.name} required />
                    </div>
                    <div>
                        <label htmlFor="productImg">Imagem do produto (URL)</label>
                        <input onChange={event => setImageURL(event.target.value)} type="url" id="productImg" placeholder="https://" defaultValue={dataWishlist?.imageURL} required />
                    </div>
                    <div>
                        <label htmlFor="economy">Quanto você pode economizar por mês?</label>
                        <input onChange={
                            (event: any) => {
                                event.target.value = event.target.value.replace(/\D/g, "");
                                return setEconomy(event.target.value = new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                }).format(event.target.value / 100));
                            }}
                            id="economy"
                            defaultValue={economy}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="productPrice">Preço do produto</label>
                        <input onChange={(event: any) => {
                            event.target.value = event.target.value.replace(/\D/g, "");
                            return setProductPrice(event.target.value = new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(event.target.value / 100));
                        }}
                            id="productPrice"
                            defaultValue={productPrice}
                            required
                        />
                    </div>
                    <button>
                        Atualizar
                </button>
                </form>
                <form id="formDelete" onSubmit={removeItem} className="delete" action="/">
                    <button>
                        Deletar
                </button>
                </form>
            </div>
        </main>
    )
}

export default Edit;