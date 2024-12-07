export function FormInput({ register, type, name, placeholder, error, className, classError }) {
	
  return (
		<>
			<input
        id={name}
        name={name}
				{...register(name)}
				type={type}
				placeholder={placeholder}
				className={className}

			/>
			{error && <p className={classError}>{error.message}</p>}
		</>
	);
}
