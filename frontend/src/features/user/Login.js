import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

function Login() {
    const navigate = useNavigate();

    const INITIAL_LOGIN_OBJ = {
        password: "",
        emailId: ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (loginObj.emailId.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
        if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        else {
            setLoading(true)
            const response = await fetch("/mapi/longin", {
                method: "POST",
                body: JSON.stringify({ "email": loginObj.emailId, "password": loginObj.password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const result = await response.json();
            if(result){  
                localStorage.setItem("mabbonz-malik", "DumyTokenHere");
                navigate("/app/priceandtagapp");
            }
            else{
                setErrorMessage("Incorrect email/password");
            }
            setLoading(false)
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="bg-base-100 rounded-xl">
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                            </div>


                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login