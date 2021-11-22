export const changeTitleBtnCopy = (title, newText, lastText) => {
	title.innerHTML = newText;

	setTimeout(() => {
		title.innerHTML = lastText;
	}, 1500);
};

const copyToClipboard = (event) => {
	const codeBlock = event.currentTarget.closest(`.demo-code__container`).querySelector(".language");
	const titleBtn = event.currentTarget.closest(".demo-code__container-back-btn-wrapper").querySelector("h4");

	changeTitleBtnCopy(titleBtn, "Copied", titleBtn.innerHTML);

	const textare_ForToCopy = document.createElement("textarea");
	textare_ForToCopy.textContent = codeBlock.textContent.trim();

	document.body.appendChild(textare_ForToCopy);

	textare_ForToCopy.select();
	document.execCommand("copy");
	document.body.removeChild(textare_ForToCopy);
};


export function addEvent_CopyText(btnCopy) {
	btnCopy.addEventListener("click", copyToClipboard);
};
