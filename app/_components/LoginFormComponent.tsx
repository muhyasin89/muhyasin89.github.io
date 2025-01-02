import "./LoginFormComponent.css";
import React, {
    ChangeEvent, 
    SyntheticEvent, 
    useEffect, 
    useRef, 
    useState
} from "react"

import { 
    useRive, 
    Layout, 
    Fit, 
    Alignment, 
    UseRiveParameters, 
    RiveState, 
    StateMachineInput, 
    useStateMachineInput 
} from 'rive-react';

const STATE_MACHINE_NAME = 'Login Machine';

const LoginFormComponent = (riveProps: UseRiveParameters = {}) => {
    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if(inputRef?.current && !inputLookMultiplier) {
            setInputLookMultiplier(inputRef.current?.offsetWidth / 100)
        }
    }, [inputRef])

    const { rive: riveInstance, RiveComponent }: RiveState = useRive({
        src: 'animated_login_character.riv',
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true,
        layout: new Layout({
          fit: Fit.Cover,
          alignment: Alignment.Center,
        }),
        ...riveProps,
    });

    const isCheckingInput: StateMachineInput = useStateMachineInput(
        riveInstance,
        STATE_MACHINE_NAME,
        'isChecking'
    );

    const numLookInput: StateMachineInput =  useStateMachineInput(
        riveInstance,
        STATE_MACHINE_NAME,
        'numLook'
    )

    const trigSuccessInput: StateMachineInput = useStateMachineInput(
        riveInstance,
        STATE_MACHINE_NAME,
        'trigSuccess'
    )

    const trigFailInput: StateMachineInput = useStateMachineInput(
        riveInstance,
        STATE_MACHINE_NAME,
        'trigFail'
    )


    const isHandsUpInput: StateMachineInput = useStateMachineInput(
        riveInstance,
        STATE_MACHINE_NAME,
        'isHandsUp'
    )

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setUserValue(newVal);

        if(!isCheckingInput.value){
            isCheckingInput.value = true;
        }

        const numChars = newVal.length;
        numLookInput.value = numChars * inputLookMultiplier;
    }

    const onUsernameFocus = () => {
        isCheckingInput.value = true;
        if(numLookInput.value != userValue.length * inputLookMultiplier){
            numLookInput.value = userValue.length * inputLookMultiplier;
        }
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setPassValue(newVal);
    }

    const LOGIN_TEXT = 'login';
    const LOGIN_PASSWORD = 'password';
    const [loginButtonText, setLoginButtonText] = useState(LOGIN_TEXT);

    const onSubmit = (e: SyntheticEvent) => {
        console.log("the submit is", e, passValue,LOGIN_PASSWORD, passValue === LOGIN_PASSWORD );
        setLoginButtonText('Checking...')
        setTimeout(() => {
            
            passValue === LOGIN_PASSWORD
              ? trigSuccessInput!.fire()
              : trigFailInput!.fire();

              setLoginButtonText(LOGIN_TEXT);
          }, 1500);
        e.preventDefault()
        return false;

    }

    return (
        <div className="login-form-component-root">
            <div className="login-form-wrapper">
                <div className="rive-wrapper">
                    <RiveComponent className="rive-container" />
                </div>
                <div className="form-container">
                    <form onSubmit={onSubmit}>
                        <label>
                            <input 
                                type="text"
                                className="form-username"
                                name="username"
                                placeholder="Username"
                                value={userValue}
                                onChange={onUsernameChange}
                                onFocus={onUsernameFocus}
                                onBlur = {() => (isCheckingInput.value = false)}
                                ref={inputRef}
                            />
                        </label>
                        <label>
                            <input 
                                className="form-pass"
                                type="password"
                                placeholder="Password (shh.. it's teddy)"
                                value={passValue}
                                onChange={onPasswordChange}
                                onFocus={() => (isHandsUpInput.value = true)}
                                onBlur = {() => (isHandsUpInput.value = false)}
                            />
                        </label>
                        <button className="login-btn"> {loginButtonText} </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginFormComponent;