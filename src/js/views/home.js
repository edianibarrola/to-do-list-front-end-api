import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [userInput, setUserInput] = useState("");
	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1>{"ADDlist "} </h1>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						aria-label="Large"
						aria-describedby="inputGroup-sizing-sm"
						value={userInput}
						onChange={e => setUserInput(e.target.value)}
						onKeyUp={e => {
							if (e.keyCode == 13) {
								actions.addToListEnter(userInput);
								setUserInput("");
							}
						}}
					/>
					<button
						className="input-group-append addButton"
						onClick={() => {
							actions.addToListEnter(userInput);
							setUserInput("");
						}}>
						ADD it up!
					</button>
				</div>
			</div>
			<div>
				<ol className="col-4 mx-auto light ">
					{store.inputArray.map((listItem, index) => {
						return (
							<li key={index}>
								{listItem.label}{" "}
								<input className="float-left d-flex-inline" type="checkbox" key={index} />
								<i className="fas float-right fa-ban" onClick={() => actions.removeListItem(index)} />
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
};
