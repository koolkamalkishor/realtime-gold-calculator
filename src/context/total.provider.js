import React, { useState } from "react";

import TotalContext from "./total.context";

const API_URL = "https://api.collectapi.com/economy/goldPrice";
const API_KEY = "apikey 6ir98Q5slIwaWaRHHoqNFr:4rUydREoQA4XeR0cEw3Wsh";

const TotalProvider = ({ children }) => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [goldPriceList, setGoldPriceList] = useState({list: [], isLoaded: false})
	const getRealData = async () => {
		fetch(API_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: API_KEY,
			},
		})
		.then(response => response.json())
		.then(data => setGoldPriceList({list:data.result, isLoaded:true}))
		.catch(error => console.log(error.message))
	};

	return (
		<TotalContext.Provider
			value={{
				totalHelper: [totalPrice, setTotalPrice],
				getRealData:getRealData,
				goldPriceList:goldPriceList
			}}
		>
			{children}
		</TotalContext.Provider>
	);
};

export default TotalProvider;
