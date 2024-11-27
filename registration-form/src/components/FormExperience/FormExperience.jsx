import { useFieldArray } from "react-hook-form";

export function FormExperience({ control, register, setValue, errors, isExperience }) {
	const skills = ["JavaScript", "Python", "Java", "other"];
	const level = [1, 2, 3, 4, 5];

	const { fields, append, remove } = useFieldArray({
		control,
		name: "experience",
	});

	// const initialValues = { skills: "JavaScript", level: "1", id: 1 };

	console.log('in form experience')
	console.dir(errors)
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
				}}>
				Dodaj doświadczenie
			</button>
			{errors.experience && (
				<p className="">Podaj technologie jesli zaznaczyles doswiadczenie</p>
			)}

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
						<button className='' onClick={(e) => {
							e.preventDefault()
							remove(index)}
							}>Usuń</button>
					</div>
				);
			})}

		</div>
	);

}
