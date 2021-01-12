import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import api from "../services/api";
import "../styles/pages/wishList.css"

interface WishListData {
    _id: string,
    name: string,
    imageURL: string,
    economy: number,
    productPrice: number,
    timeForAdd: number
}

function convertMoney(value: any) {
    return value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value / 100);
}

function WishList() {

    const [data, setData] = useState<WishListData[]>([]);

    useEffect(() => {
        api.get("/list").then(response => setData(response.data.data));
    }, []);
    return (
        <main>
            <nav>
                <div className="totalPrice">
                    <span>TOTAL</span>
                    {
                        convertMoney(data.reduce((total: any, element) => {
                            if (element.productPrice) {
                                return (total += element.productPrice);
                            } else {
                                return 0;
                            }
                        }, 0))
                    }
                </div>
                <div className="newItem">
                    <Link to="/wishlist/create">Novo item de desejo</Link>
                </div>
            </nav>
            <div className="items">
                {
                    data.map((item, index) => {
                        return (
                            <div className="singleItem" key={`${item._id}-${index}`}>
                                <img src={item.imageURL} alt={`image of ${item.name}`} />
                                <div className="itemName">
                                    {item.name}
                                </div>
                                <div className="productPrice">
                                    {convertMoney(item.productPrice)}
                                </div>
                                <Link to={`/wishlist/show/${item._id}`}>Ver</Link>
                            </div>
                        );
                    })
                }

            </div>
        </main>
    )
}

export default WishList;