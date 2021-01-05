const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userInput: "",
			inputArray: [],
			url: "https://assets.breatheco.de/apis/fake/todos/user/edian"
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadInitialData: () => {
				{
					fetch(getStore().url)
						.then(function(response) {
							if (!response.ok) {
								throw Error(response.statusText);
							}
							return response.json();
						})
						.then(jsonifiedResponse => setStore({ inputArray: jsonifiedResponse }))
						.catch(function(error) {
							console.log("Looks like there was a problem: \n", error);
						});
				}
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			removeListItem(id) {
				setStore({
					inputArray: getStore().inputArray.filter((input, index) => index != id)
				});
			},

			addToListButton(e) {
				let userInput = getStore().userInput;
				if (userInput) {
					let newItem = { label: userInput, done: false };
					var newInputArray = getStore().inputArray.concat(newItem);
					setStore({
						inputArray: newInputArray,
						userInput: ""
					});
				}
				fetch(getStore().url, {
					method: "PUT", // or 'POST'
					body: JSON.stringify(getStore().inputArray), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => console.log("Success:", response))
					.catch(error => console.error("Error:", error));
			},
			addToListEnter(e) {
				const store = getStore();
				let userInput = getStore().userInput;

				if (e.keyCode == 13 && userInput) {
					let newItem = { label: userInput, done: false };
					let newInputArray = store.inputArray.concat(newItem);
					setStore({
						inputArray: newInputArray,
						userInput: ""
					});
				}
			},
			setUserInput(event) {
				setStore({
					userInput: getStore().userInput + event.target.value
				});
			}
		}
	};
};
export default getState;
