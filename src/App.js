import React, { useReducer, useState } from "react";
import "./App.css";

var arr = [];
function generateArray(numElements) {
	arr = [];
	for (var i = 0; i < numElements; i++) {
		arr.push(Math.random() * 80);
	}
	return arr;
}
arr = generateArray(100);
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	return () => setValue((value) => value + 1); // update the state to force render
}
function App() {
	const [numElements, setNumElements] = useState(100);
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
	const [elements, setElements] = useState(arr);
	const [isSorted, setIsSorted] = useState(false);
	const [flip, setFlip] = useState(false);
	const sort = async (array) => {
		var i = 1;
		while (i < array.length) {
			var j = i;
			while (j > 0 && array[j - 1] > array[j]) {
				await swap(array, j, j - 1);
				j--;
				let newArr = array;
				setElements(newArr);
			}
			i++;
		}
	};

	const swap = async (array, i, j) => {
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
		let orig = document.getElementById(`${i}`);
		let dest = document.getElementById(`${j}`);
		let origStyle = orig.style;
		let destStyle = dest.style;
		let tempStyle = origStyle;
		origStyle = destStyle;
		destStyle = tempStyle;
		await delay(1000);
	};

	return (
		<div style={{ height: "100%", width: "100%" }} className="container">
			<div style={{ height: "80%", width: "100%" }} className="row">
				<div
					style={{
						height: "100%",
						width: "100%",
						display: "flex",
						flex: "row",
						justifyContent: "center",
						alignItems: "flex-end",
					}}
					className="col-md-12"
				>
					{Array.from(Array(numElements)).map((_, i) => (
						<div
							id={`${i}`}
							key={i}
							className="bar"
							style={{
								position: "initial",
								bottom: 0,
								top: 0,
								left: `${(i * 100) / numElements}%`,
								width: `${100 / numElements}%`,
								height: `${elements[i]}%`,
								backgroundColor: `hsl(${(i / 100) * 360}, 100%, 50%)`,
							}}
						/>
					))}
				</div>
			</div>
			<div style={{ height: "20%" }} className="row">
				<div style={{ height: "100%" }} className="col-md-12">
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="form-group">
							<label htmlFor="numElements">Number of elements: {numElements}</label>
							<input
								type="range"
								className="form-range"
								id="numElements"
								min="10"
								max="250"
								value={numElements}
								onChange={(e) => {
									generateArray(e.target.value);
									setElements(arr);
									if (e.target.value <= 1) {
										setNumElements(1);
									} else {
										setNumElements(parseInt(e.target.value));
									}
								}}
							/>
						</div>
						<button
							onClick={() => {
								sort(elements);
								setIsSorted(!isSorted);
							}}
						>
							SORT
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
