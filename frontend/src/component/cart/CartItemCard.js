import React from 'react';
import { Link } from 'react-router-dom';
import "./CartItemCard.css";

const CartItemCard = ({item, deleteCartItems}) => {
    return (
        <div className='CartItemCard'>
            <img src={item.image} alt="#" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Giá bán:${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
                'VND'}).format(item.price)}`}</span> 
                <p onClick={() => deleteCartItems(item.product)}>Xóa</p>
            </div>
        </div>
    ) 
}

export default CartItemCard
