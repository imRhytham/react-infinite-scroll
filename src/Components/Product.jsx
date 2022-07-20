import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
	let currentSkip = 0;
	const [products, setProducts] = useState([]);

	// to call API and load data in product array
	const loadTenproducts = () => {
		const tenProducts = [];
		axios
			.get(`https://dummyjson.com/products?skip=${currentSkip}&limit=9`)
			.then(({ data }) => {
				data.products.forEach((p) => tenProducts.push(p));
				setProducts((products) => [...products, ...tenProducts]);
			});
		console.log(tenProducts, products);
		currentSkip += 10;
	};

	// function to calculate the height of screen based on scroll position
	const handleScroll = (e) => {
		const scrollHeight = e.target.documentElement.scrollHeight;
		const currentHeight = Math.ceil(
			e.target.documentElement.scrollTop + window.innerHeight
		);
		if (currentHeight + 1 >= scrollHeight) {
			loadTenproducts();
		}
	};

	//
	useEffect(() => {
		loadTenproducts();
		window.addEventListener('scroll', handleScroll);
	}, []);

	return (
		<div
			className='grid 
      flex-col items-center
      justify-center min-h-screen py-2
    bg-gray-300 text-gray-200'
		>
			<div className='grid grid-cols-1 gap-x-5 md:grid-cols-3  w-full px-4 md:px-15'>
				{products.map((p, i) => {
					return (
						<div className='p-8' key={p?.id}>
							<div className='shadow hover:shadow-md w-full h-96 bg-white rounded-lg overflow-hidden cursor-pointer'>
								<img
									className='object-cover w-full h-4/6'
									src={p?.thumbnail}
									alt={p?.title}
								/>

								<div className='relative p-4'>
									<div className='flex flex-row justify-between '>
										<h3 className='text-base md:text-lg font-medium text-gray-800'>
											{p?.title}
										</h3>
										<span class='md:text-lg font-bold text-gray-600'>
											${p.price}
										</span>
									</div>
									<span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
										{p.rating}
									</span>

									<p className='mt-4 text-base md:text-sm text-gray-600'>
										{p.description}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Product;
