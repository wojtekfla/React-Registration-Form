import style from "./FormResume.module.css"

export function FormResume({ formData }) {
	const imageUrl = URL.createObjectURL(formData.fileInput[0]);

	return (
		<>
			<div className={style.container}>
				<div className={style.section}>
					<h2 className={style.sectionTitle}>Dane osobowe</h2>
					<p>Imię: {formData.firstName}</p>
					<p>Nazwisko: {formData.lastName}</p>
					<p>Email: {formData.email}</p>
					<p>Telefon: {formData.phone}</p>
				</div>

				<div className={style.section}>
					<h2 className={style.sectionTitle}>Doświadczenie w programowaniu</h2>
					{formData.experience?.map((item, index) => {
						return (
							<li key={index}>
								technologia: {item.skills} / poziom: {item.level}
							</li>
						);
					})}
				</div>

				<div className={style.section}>
					<h2 className={style.sectionTitle}>Preferencje kursu</h2>
					<p>Typ kursu: {formData.studytype}</p>
					{formData.technology.map((item, index) => {
						return <li key={index}>technologia: {item}</li>;
					})}
				</div>

				<div className={style.section}>
					<h2 className={style.sectionTitle}>Curriculum vitae</h2>
					<img className={style.sectionImg}
						src={imageUrl}
						alt="cv file"
					/>
				</div>
			</div>
		</>
	);
}
