import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios"


export default function PizzaForm(){

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




return(

    <form onSubmit = {}>
        <label htmlFor = "name">
            Name
            <input id="name" type="text" name="name" data-cy="name" onChange={} />
        </label>

        <label htmlFor = "size">
            Size
            <select id="size" name = "size" onChange={}>
                <option value = "Tiny">Tiny</option>
                <option value = "TwoHands">Two Hands</option>
                <option value = "Medium">Medium</option>
                <option value = "VeryBig">VeryBig</option>
                <option value = "Gluttony">Gluttony</option>
            </select>
        </label>


        <label htmlFor = "olive" className="olive">
            Olives
            <input type="checkbox" name="olive" checked={} onChange = {}/>
        </label>

        <label htmlFor = "beef" className="beef">
            Olives
            <input type="checkbox" name="beef" checked={} onChange = {}/>
        </label>

        <label htmlFor = "onion" className="onion">
            Olives
            <input type="checkbox" name="onion" checked={} onChange = {}/>
        </label>

        <label htmlFor = "ham" className="ham">
            Olives
            <input type="checkbox" name="ham" checked={} onChange = {}/>
        </label>


        <label htmlFor = "instructions"
         Instructions
         <textarea name = "instructions" onChange = {} />
        </label>


    </form>


);

};