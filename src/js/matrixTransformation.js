const normalView = [1, 0, 0, 1, 0, 0];

const indexProperties = {
	0: "scaleX",
	1: "",
	2: "",
	3: "scaleY",
	4: "translateX",
	5: "translateY",
}

export function matrixTransformation(matrix) {
	let normalTransform = "";
	let values = matrix.replace(/matrix|[()]/g, "").split(", ");
	values = values.map(value => parseFloat(value));

	values.forEach((val, index) => {

		if ( val === normalView[index] ) {

		};

		if ( index === 0 ) {

		} else if ( index === 1 ) {

		} else if ( index === 2 ) {

		} else if ( index === 3 ) {

		} else if ( index === 4 ) {
			normalTransform = `${indexProperties[index]}(${val}px)`;
		} else if ( index === 5 ) {

		};
	});

	return normalTransform;
};
