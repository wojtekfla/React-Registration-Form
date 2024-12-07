import style from "./App.module.css";
import { useState } from "react";
import { FormMain } from "./components/FormMain/FormMain";
import { FormResume } from "./components/FormResume/FormResume";

function App() {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [formData, setFormData] = useState(null);

	return (
		<>
			{!isFormSubmitted ? (
				<>
					<h1 className={style.title}>
						Formularz zgłoszeniowy na kurs programowania
					</h1>
					<div className={style.container}>
						<FormMain
							setIsFormSubmitted={setIsFormSubmitted}
							setFormData={setFormData}
						/>
					</div>
				</>
			) : (
				<>
					<h1 className={style.title}>Dane z formularza</h1>
					<FormResume formData={formData} />
				</>
			)}
		</>
	);
}

export default App;
