import { useFieldArray } from "react-hook-form";

export function FormExperience({
	control,
	register,
	setValue,
	errors,
	data,
	hasExperience,
}) {
	const skills = ["JavaScript", "Python", "Java", "other"];
	const level = [1, 2, 3, 4, 5];

	const { fields, append, remove } = useFieldArray({
		control,
		name: "experience",
	});

	return (
		<div>
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault();
					append({
						skills: "JavaScript",
						level: "1",
					});
					// {}
				}}>
				Dodaj doświadczenie
			</button>
			{errors.experience && <p className="">{errors.experience.message}</p>}

			{fields.map((field, index) => {
				setValue(`experience.${index}.id`, field.id);
				return (
					<div key={index}>
						<select
							className=""
							{...register(`experience.${index}.skills`)}
							id={`skills-${index}`}>
							{skills.map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
						<select
							className=""
							{...register(`experience.${index}.level`)}
							id={`level-${index}`}>
							{level.map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
						<button
							className=""
							onClick={(e) => {
								e.preventDefault();
								remove(index);
							}}>
							Usuń
						</button>
					</div>
				);
			})}
		</div>
	);
}
