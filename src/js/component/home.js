import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { array } from "prop-types";

//create your first component
export function Home() {
	const [list, setList] = useState([
		{ label: "Walk the dog", done: false }, //this is an array
		{ label: "Take out the trash", done: false }, //this is an array
		{ label: "Do the dishes", done: false }, //this is an array
		{ label: "Finish React HW", done: false }, //this is an array
		{ label: "Kick ass in Warzone", done: false }, //this is an array
		{ label: "Sleep like a baby", done: false } //this is an array
	]);

	const [todo, setTodo] = useState("");

	// useEffect(() => {
	// 	inputRef.current.addEventListener("keypress", handleKeyPress);
	// }, []);

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			// let aux=list; //extra
			// aux.push(todo) //extra
			// setList(aux) //secondary method

			setList(list.concat([{ label: todo, done: false }]));
			setTodo("");
		}
	};

	return (
		<>
			<nav className="navbar navbar-light">
				<div className="row w-100">
					<div className="col-2">
						<a className="navbar-logo" href="#">
							<img
								src="http://topnotchmarketingsolutionsllc.com/wp-content/uploads/2018/11/Full_straight-copy-80x80.png"
								width="60"
								height="60"
								alt=""
								loading="lazy"
							/>
						</a>
					</div>
					<div className="col-8 text-center">
						<a className="navbar-brand mx-auto" href="#">
							<h2>TODO List</h2>
						</a>
					</div>
					<div className="col-2" />
				</div>
			</nav>
			<div className="d-flex flex-column align-items-center justify-content-center">
				<h1>My TODO list</h1>
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
										<FontAwesomeIcon icon={faTimes} />{" "}
									</span>{" "}
								</li>
							);
						})}
						<li>
							{list.length} item
							{list.length > 1 || list.length === 0
								? "s"
								: null}{" "}
							left
						</li>
					</ul>
				</form>
			</div>
			<footer className="footer fixed-bottom w-100">
				<p>
					Made with the power of <i className="fas fa-coffee" /> by
					Chris Angelos
				</p>
			</footer>
		</>
	);
}
