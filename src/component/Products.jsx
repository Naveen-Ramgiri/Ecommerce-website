import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState([]);
    let componentMounted = true;

    // Api calling
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://mocki.io/v1/2525e36d-120e-45ba-8966-1fa95d85f300")
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);
    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                </div>
            </>
        );
    }

    // Filter method
    const filterProduct = (element) => {
        const updatedList = data.filter((value) => value.category === element);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <>
                {/* Filtered products categories using buttons */}
                <div className="buttons mb-s pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All <i className="fa fa-angle-double-right"></i></button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing <i className="fa fa-angle-double-right"></i></button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing <i className="fa fa-angle-double-right"></i></button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>Jewelery <i className="fa fa-angle-double-right"></i></button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronic <i className="fa fa-angle-double-right"></i></button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            {/* Products list */}
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 card-sec" key={product.id}>
                                    <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                    <div className="card-body">
                                        <a className="card-title lead fw-bold">{product.title.substring(0, 12)}...</a>
                                        <p className="card-text list-desc">{product.description}</p>
                                        <p className="card-text lead fw-bold">${product.price}</p>
                                        
                                        <p><b>Size:</b> {product.size}</p>
                                        <p><b>Color:</b> {product.color}</p>
                                        <p className="lead1">
                                            {product.rating && product.rating.rate} 
                                            <i className='fa fa-star'></i> <span>({product.rating.count})</span>
                                        </p>
                                        <NavLink to={`/products/${product.id}`} className="btn btn-primary">Add to Basket</NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )

    }
    return (
        <div>
            <div className="container my-pdp">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center mt-5">Trending Products</h1>

                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}

                </div>
            </div>
        </div>
    )
}

export default Products