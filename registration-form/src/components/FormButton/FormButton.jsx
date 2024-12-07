import style from "./FormButton.module.css";

export function FormButton({ type, children, onClick}) {

	return (
		<button type={type} onClick={onClick} className={style.button} >
			{children}
		</button>
	);
}
