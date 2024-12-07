import style from "./FormMain.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FormExperience } from "../FormExperience/FormExperience";
import { FormInput } from "../FormInput/FormInput";
import { FormButton } from "../FormButton/FormButton";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg"];

const formSchema = z
	.object({
		firstName: z
			.string()
			.min(3, { message: "Name must be 3 or more characters long" }),
		lastName: z
			.string()
			.min(3, { message: "Lastname must be 3 or more characters long" }),
		email: z
			.string()
			.min(3, { message: "Email is required" })
			.includes("@", { message: "Invalid email address" }),
		phone: z
			.string()
			.min(9, { message: "Input a valid number, at least 9 digits" }),
		studytype: z.enum(["stacjonarna", "online"], { message: "Select at least one" }),
		technology: z
			.array(
				z.enum(["react", "nodejs", "nextjs", "css", "asembler"], {
					message: "Select technology to learn",
				})
			)
			.nonempty({ message: "At least one must be selected" }),
		fileInput: z
			.instanceof(FileList)
			.refine((fileList) => fileList.length === 1, { message: "Attach file" })
			.refine((fileList) => ACCEPTED_FILE_TYPES.includes(fileList[0]?.type), {
				message: "Unaccepted file format",
			}),
		hasExperience: z.boolean(),
		experience: z
			.array(
				z.object({
					skills: z.string(),
					level: z.string(),
				})
			)
			.optional(),
	})
	.refine(
		(data) => {
			return (
				!data.hasExperience ||
				(data.hasExperience && data.experience && data.experience.length > 0)
			);
		},
		{
			message:
				"When programming experience is selected, the experience list cannot be empty.",
			path: ["experience"],
		}
	);

export function FormMain({ setIsFormSubmitted, setFormData }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
		setValue,
	} = useForm({
		resolver: zodResolver(formSchema),
	});

	const [experienceChecked, setExperienceChecked] = useState(false);

	const onSubmit = (data) => {
		return new Promise((res) => {
			setTimeout(() => {
				res(true);
				setFormData(data);
				setIsFormSubmitted(true);
			}, 5 * 1000);
		});
	};

	const handleExperienceChecked = function () {
		setExperienceChecked((prevState) => !prevState);
	};

	return (
		<>
			<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
				<h2 className={style.form__header}>Dane osobowe</h2>

				<div>
					<FormInput
						name="firstName"
						register={register}
						type="text"
						placeholder="Imię"
						error={errors.firstName}
						className={style.input}
						classError={style.error}
					/>
				</div>
				<div>
					<FormInput
						name="lastName"
						register={register}
						type="text"
						placeholder="Nazwisko"
						error={errors.lastName}
						className={style.input}
						classError={style.error}
					/>
				</div>
				<div>
					<FormInput
						name="email"
						register={register}
						type="text"
						placeholder="E-mail"
						error={errors.email}
						className={style.input}
						classError={style.error}
					/>
				</div>
				<div>
					<FormInput
						name="phone"
						register={register}
						type="number"
						placeholder="Numer telefonu"
						error={errors.phone}
						className={style.input}
						classError={style.error}
					/>
				</div>

				<div className={style.studytype}>
					<p className="studytype">Wybierz formę nauki</p>

					<div className={style.studytype__input}>
						<label htmlFor="fullTime">
							<input
								{...register("studytype")}
								type="radio"
								value="stacjonarna"
								name="studytype"
								id="fullTime"
							/>
							Stacjonarna
						</label>

						<label htmlFor="online">
							<input
								{...register("studytype")}
								type="radio"
								value="online"
								name="studytype"
								id="online"
							/>
							Online
						</label>
					</div>
				</div>
				{errors.studytype && (
					<p className={style.error}>{errors.studytype.message}</p>
				)}

				<div>
					<select
						className={style.technology}
						{...register("technology")}
						name="technology"
						id="technology"
						multiple={true}
						size={5}>
						<option value="react">React</option>
						<option value="nodejs">Node.js</option>
						<option value="nextjs">Next.js</option>
						<option value="css">CSS</option>
						<option value="asembler">Asembler ;)</option>
					</select>
					{errors.technology && (
						<p className={style.error}>{errors.technology.message}</p>
					)}
				</div>

				<div className={style.fileInput}>
					<p>Dodaj swoje CV</p>
					<label htmlFor="fileInput" className={style.fileInput}>
						<input
							{...register("fileInput")}
							className={style.fileInput}
							type="file"
							id="fileInput"
						/>
					</label>
					{errors.fileInput && (
						<p className={style.error}>{errors.fileInput.message}</p>
					)}
				</div>

				<div className={style.experience}>
					<label htmlFor="hasExperience">
						<input
							{...register("hasExperience")}
							type="checkbox"
							id="hasExperience"
							name="hasExperience"
							onChange={handleExperienceChecked}
							className={style.experienceInput}
						/>
						Czy masz doświadczenie w programowaniu?
					</label>
				</div>

				{experienceChecked && (
					<FormExperience
						control={control}
						register={register}
						setValue={setValue}
						errors={errors}
						hasExperience={experienceChecked}
						classError={style.error}
					/>
				)}
				{isSubmitting ? (
					<button disabled>Wysyłanie</button>
				) : (
					<FormButton type="submit">Wyślij</FormButton>
				)}
			</form>
		</>
	);
}
