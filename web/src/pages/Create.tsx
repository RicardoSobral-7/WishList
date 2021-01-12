import React, { useState, FormEvent } from 'react';
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/pages/create.css";

function Create() {
    const [productName, setProductName] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [economy, setEconomy] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const history = useHistory();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const economyFormated = economy.replace(/\D/g, "");
        const productPriceFormatted = productPrice.replace(/\D/g, "");
        const data = {
            name: productName,
            imageURL: imageURL,
            economy: economyFormated,
            productPrice: productPriceFormatted
        }

        await api.post("wishlist/create", data);
        alert("Registro realizado com sucesso!");
        history.push("/");

    }

    return (
        <main>
            <Navbar />
            <div className="createItemForm">
                <form onSubmit={handleSubmit} action="post">
                    <div>
                        <label htmlFor="productName">Nome do Produto</label>
                        <input onChange={event => setProductName(event.target.value)} type="text" id="productName" value={productName} required />
                    </div>
                    <div>
                        <label htmlFor="productImg">Imagem do produto (URL)</label>
                        <input onChange={event => setImageURL(event.target.value)} type="url" id="productImg" placeholder="https://" value={imageURL} required />
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
                            value={economy}
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
                            value={productPrice}
                            required
                        />
                    </div>
                    <button>
                        Adicionar Item
                    </button>
                </form>
            </div>
        </main>
    )
}
export default Create;