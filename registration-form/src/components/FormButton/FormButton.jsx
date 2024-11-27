export function FormButton({ type, text, onClick, className }) {
	return (
		<button type={type} onClick={onClick} className={className}>
			{text}
		</button>
	);
}
