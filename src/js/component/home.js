import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { array } from "prop-types";

//create your first component
export function Home() {
	const urlApi =
		"https://assets.breatheco.de/apis/fake/todos/user/christodos";
	const [currentTodo, setCurrentTodo] = useState("");
	const [list, setList] = useState([]);

	const [todo, setTodo] = useState("");

	const syncList = () => {
		return fetch(urlApi)
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				setList(data);
			})
			.catch(error => {
				console.error(error);
			});
	};

	useEffect(() => {
		syncList();
	}, []);

	const updateList = newList => {
		return fetch(urlApi, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newList)
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				syncList();
			})
			.catch(error => {
				console.error(error);
			});
	};

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			// let aux=list; //extra
			// aux.push(todo) //extra
			// setList(aux) //secondary method

			// setList(list.concat([{ label: todo, done: false }]));
			updateList([...list, { label: todo, done: false }]); //dif way to line32 (...=spread operator)
			setTodo("");
		}
	};

	const deleteToDo = i => {
		const newList = list.filter((item, index) => index != i);
		console.log(newList);
		updateList(newList);
	};

	const clearAll = () => {
		updateList([{ label: "Sample Task", done: false }]);
	};

	return (
		<>
			<nav className="navbar navbar-light">
				<div className="row w-100">
					<div className="col-2">
						<a className="navbar-logo" href="#">
							<img
								src="http://topnotchmarketingsolutionsllc.com/wp-content/uploads/2018/11/Full_straight-copy-80x80.png"
								width="80"
								height="80"
								alt=""
								loading="lazy"
							/>
						</a>
					</div>
					<div className="col-8 text-center">
						<a className="navbar-brand mx-auto" href="#">
							<h2 />
						</a>
					</div>
					<div className="col-2" />
				</div>
			</nav>
			<div className="formtotal d-flex flex-column align-items-center justify-content-center">
				<h1>MY TO-DO LIST</h1>
				<form onSubmit={e => e.preventDefault()}>
					<ul className="list-unstyled">
						<li>
							<input
								value={todo}
								className="form-control"
								type="text"
								placeholder="what has to be done?"
								onChange={e => setTodo(e.target.value)}
								onKeyPress={e => handleKeyPress(e)}
							/>
						</li>
						{list.map((item, index) => {
							return (
								<li key={index}>
									{" "}
									{item.label}{" "}
									<span>
										{" "}
										<FontAwesomeIcon
											onClick={() => deleteToDo(index)}
											icon={faTimes}
										/>{" "}
									</span>{" "}
								</li>
							);
						})}
						<li className="items">
							<span onClick={clearAll}> Clear All </span>
							{list.length} item
							{list.length > 1 || list.length === 0
								? "s"
								: null}{" "}
							left
						</li>
					</ul>
				</form>
			</div>
			<footer className="footer w-100">
				<p>
					Made with the power of <i className="fas fa-coffee" /> by
					Chris Angelos
				</p>
			</footer>
		</>
	);
}
