import { useFieldArray } from "react-hook-form";
import style from "./FormExperience.module.css"

export function FormExperience({
	control,
	register,
	setValue,
	errors,
	classError
}) {
	const skills = ["JavaScript", "Python", "Java", "other"];
	const level = [1, 2, 3, 4, 5];

	const { fields, append, remove } = useFieldArray({
		control,
		name: "experience",
	});

	return (
		<div className={style.exp}>
			<button className={style.expButton}
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
			{errors.experience && <p className={classError}>{errors.experience.message}</p>}

			{fields.map((field, index) => {
				setValue(`experience.${index}.id`, field.id);
				return (
					<div className={style.exp} key={index}>
						<select
							className={style.expSelect}
							{...register(`experience.${index}.skills`)}
							id={`skills-${index}`}>
							{skills.map((item) => (
								<option className={style.expSelect} key={item} value={item}>
									{item}
								</option>
							))}
						</select>
						<select
							className={style.expSelect}
							{...register(`experience.${index}.level`)}
							id={`level-${index}`}>
							{level.map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
						<button
							className={style.expButtonDelete}
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
