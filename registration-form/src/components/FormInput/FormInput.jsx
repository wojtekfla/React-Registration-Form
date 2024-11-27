export function FormInput({ register, type, name, placeholder, error }) {
	
  return (
		<>
			<input
        id={name}
        name={name}
				{...register(name)}
				type={type}
				placeholder={placeholder}

			/>
			{error && <p className=''>{error.message}</p>}
		</>
	);
}
