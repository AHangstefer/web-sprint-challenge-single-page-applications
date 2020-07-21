import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios"


export default function PizzaForm(){

    const [post, setPost] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const defaultState = {
        name: "",
        size: "",
        olive:"",
        beef:"",
        onion:"",
        ham:"",
        instructions:""
    };

    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] =useState(defaultState);

    const formSchema = yup.object().shape({
        name: yup.string().required("Please tell us your name"),
        size: yup.string(),
        olive: yup.boolean(),
        beef: yup.boolean(),
        onion: yup.boolean(),
        ham: yup.boolean(),
        instructions: yup.string()

    });

    const validateChange = e => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid =>{
            setErrors({...errors, [e.target.name]: ""});
        })
        .catch(err => setErrors({...errors, [e.target.name]: err.errors[0]}));
    };

    useEffect(() =>{
        formSchema.isValid(formState).then(valid =>{
            console.log("valid?", valid);
            setIsButtonDisabled(valid);
        });
    }, [formState]);
    console.log("this is formState", post);

    const formSubmit = e =>{
        e.preventDefault();
        console.log ("form submitted!")
        axios
        .post("https://reqres.in/api/users", formState)
        .then(response => {
            console.log(response)
            setPost([...post, response.data]);
            setFormState(defaultState);
            
        
        })
        .catch(err => console.log(err.response));
    };

    //console.log(setFormState);

    const inputChange = e => {
        console.log ("input changed", e.target.value);
        e.persist()

        const newFormData = {
            ...formState,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e)
        setFormState(newFormData);
    };
  
    


    return(

        <form onSubmit = {formSubmit}>
            <label htmlFor = "name">
                Name
                <input id="name" type="text" name="name" data-cy="name"
                 onChange={inputChange} 
                 value={formState.name}
                 />
            </label>
            {errors.name.length >0 ? <p className="error">{errors.name}</p> : null}

            <label htmlFor = "size">
                Size
                <select id="size" name = "size" onChange={inputChange}>
                    <option value = "Tiny">Tiny</option>
                    <option value = "TwoHands">Two Hands</option>
                    <option value = "Medium">Medium</option>
                    <option value = "VeryBig">Very very Big</option>
                    <option value = "Gluttony">Gluttony</option>
                </select>
            </label>


            <label htmlFor = "olive" className="olive" data-cy="olive">
                <input type="checkbox" name="olive" checked={formState.olive} onChange = {inputChange}/>
                Olives
            </label>

            <label htmlFor = "beef" className="beef" data-cy='beef'>
                 <input type="checkbox" name="beef" checked={formState.beef} onChange = {inputChange}/>
                 Beef
            </label>

            <label htmlFor = "onion" className="onion" data-cy='onion'>
                <input type="checkbox" name="onion" checked={formState.onion} onChange = {inputChange}/>
                Onions
            </label>

            <label htmlFor = "ham" className="ham" data-cy='ham'>
                <input type="checkbox" name="ham" checked={formState.ham} onChange = {inputChange}/>
                Ham
            </label>


            <label htmlFor = "instructions">
            <textarea name = "instructions" onChange = {inputChange} value={formState.instructions} />
            Instructions
            </label>

            <button disabled={isButtonDisabled} type="submit" id ="submit">
                Add to Order
            </button>

            <pre>{JSON.stringify(formState,null,2)}</pre>
            <pre>{JSON.stringify(post,null,2)}</pre>
            
            


        </form>


    );
};