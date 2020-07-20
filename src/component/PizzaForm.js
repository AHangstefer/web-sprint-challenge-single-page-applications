import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios"


export default function PizzaForm(){

    const [post, setPost] = ([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const defaultState = {
        name: "",
        size: "",
        olive:"",
        beef:"",
        onion:"",
        ham:"",
        instructions:"",
    };

    const [formState, setFromState] = useState(defaultState);
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
            setIsButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e =>{
        e.preventDefault();
        console.log ("form submitted!");
        axios
        .post("https://reqres.in/api/users", formState)
        .then(response =>{
            setPost(response.data);
            setFromState(defaultState);
        })
        .catch(err => console.log(err.response));
    };

    const inputChange = e => {
        console.log ("input changed", e.target.value);
        console.log (formState);
        e.persist()

        const newFormData = {
            ...formState,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e)
        setFromState(newFormData);
        console.log(formState);
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


            <label htmlFor = "olive" className="olive">
                <input type="checkbox" name="olive" checked={formState.olive} onChange = {inputChange}/>
                Olives
            </label>

            <label htmlFor = "beef" className="beef">
                 <input type="checkbox" name="beef" checked={formState.beef} onChange = {inputChange}/>
                 Beef
            </label>

            <label htmlFor = "onion" className="onion">
                <input type="checkbox" name="onion" checked={formState.onion} onChange = {inputChange}/>
                Onions
            </label>

            <label htmlFor = "ham" className="ham">
                <input type="checkbox" name="ham" checked={formState.ham} onChange = {inputChange}/>
                Ham
            </label>


            <label htmlFor = "instructions">
            Instructions
            <textarea name = "instructions" onChange = {inputChange} value={formState.instructions} />
            </label>

            <button type="submit" id ="submit">
                Submit
            </button>


        </form>


    )
}