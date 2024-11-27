import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { FormExperience } from "../FormExperience/FormExperience"
import { FormInput } from "../FormInput/FormInput";

const experienceSchema = z.object ({
  id: z.string(),
  skills: z.string(),
  level: z.string()
})

const formSchema = z.object({
  firstName: z .string() .min(3, { message: 'Name must be 3 or more characters long'}),
  lastName: z .string() .min(3, { message: 'Lastname must be 3 or more characters long'}),
  email: z. string() .min(3, { message: "Email is required" }) .includes('@', {message: "Invalid email address" }),
  phone: z .string() .min(9, { message: "Input a valid number, at least 9 digits" }),
  studytype: z .enum(['stacjonarna', 'online'], {message: "Wybierz jedną"}),
  technology: z.array(z.enum(['react', 'nodejs', 'nextjs', 'css', 'asembler'], {message: 'Select technology to learn'})) .nonempty( {message: 'At least one must be selected'}),

  experienceBox: z.boolean() .optional(),

  // tu nie wiem jak uzależnić od tego czy jest experienceBox checked, próbowałem już na tyle sposobów, masakra ...
  experience: z.array(experienceSchema)
     
  //   z.object({
  //     skills: z.enum(["JavaScript", "Python", "Java", "other"], {message: "Select experience in tech"}), 
  //     level: z.enum (['1', '2', '3', '4', '5'], {message: 'How many years of exp. do you have'})
  //   })
  // .nonempty({message: "Select at least one"})
})

export function FormMain() {
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue
    
  } = useForm ({
    resolver: zodResolver(formSchema),
  })

  const [experienceChecked, setExperienceChecked] = useState (false)

  const onSubmit = (data) => {
    console.log('data', data)
  }

  const handleExperienceChecked = function () {
    console.log('experienceChecked', experienceChecked)
    setExperienceChecked((prevState) => !prevState)
    console.log('new value for exp', experienceChecked)
  }

  if(errors.message) {
    console.log('in form main')
    console.dir(errors)

  }
  console.dir(errors)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2>Dane osobowe</h2>
        
        <div>
          <FormInput
           name='firstName'
           register={register}
           type='text'
           placeholder='Imię'
           error={errors.firstName}
          />
        </div>

        <div>
          <FormInput
           name='lastName'
           register={register}
           type='text'
           placeholder='Nazwisko'
           error={errors.lastName}
          />
        </div>

        <div>
          <FormInput
           name='email'
           register={register}
           type='text'
           placeholder='email'
           error={errors.email}
          />
        </div>

        <div>
          <FormInput
           name='phone'
           register={register}
           type='number'
           placeholder=''
           error={errors.phone}
          />
        </div>


        <div>
          <p className="studytype">Wybierz formę nauki</p>
          
          <input {...register('studytype')} type="radio" value="stacjonarna" name="studytype" id="fullTime" />
          <label htmlFor="fullTime">Stacjonarna</label>
          
          <input {...register('studytype')} type="radio" value="online" name="studytype" id="online"/>
          <label htmlFor="online">Online</label>
          {errors.studytype && <p className=''>{errors.studytype.message}</p>}
        </div>

        <div>
          <select {...register('technology')} name="technology" id="technology" multiple={true} size={5}>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
            <option value="nextjs">Next.js</option>
            <option value="css">CSS</option>
            <option value="asembler">Asembler ;)</option>
          </select>
          {errors.technology && <p className=''>{errors.technology.message}</p>}
        </div>

        <div>
          <p>Dodaj swoje CV</p>
          <input type="file" />
        </div>

        <div>
          <input type="checkbox" id='experienceBox' checked={experienceChecked} onChange={handleExperienceChecked}  />
          <label htmlFor="experienceBox">Czy masz doświadczenie w programowaniu</label>
        </div>

        {experienceChecked && <FormExperience control={control} register={register} setValue={setValue} errors={errors} isExperience={experienceChecked} />}


        <br />
        <button type="submit">Wyślij</button>
        

      </form>
    </>
  )
}

// 