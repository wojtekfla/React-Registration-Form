import { useForm } from "react-hook-form"


export function FormComponent() {
  const { 
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm ()

  const name = watch('name')
  if (name) { console.log('name', name ) }

  const onSubmit = (data) => {
    console.log('data', data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Dane osobowe</h2>
        
        <div>
          <input {...register('name', {required: true} )} type="text" name="name" placeholder="Imię"/>
          {errors.name && <p>Pole jest wymagane</p>} 
        </div>

        <div>
          <input {...register('lastName', {required: true} )} type="text" name="lastName" placeholder="Nazwisko"/>          
        </div>

        <div>
          <input {...register('email', {required: true} )} type="email" name="email" placeholder="e-mail"/>
        </div>

        <div>
          <input {...register('phone', {required: true} )} type="number" name="phone" placeholder="nr telefonu"/>
          
        </div> 

        <button type="submit">Wyślij</button>

      </form>
    </>
  )


}