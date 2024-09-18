import React, { useContext } from "react";
import { json, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Input from "../../components/Form/Input";
import useForm from '../../hooks/useForm'
import { requiredValidator, minValidator, maxValidator, emailValidator } from '../../validators/rules'
import "./Register.css";
import apiRequests from "../../services/Axios/configs";
import AuthContext from "../../context/authContext";

export default function Register() {
    const [formState, onInputHandler] = useForm({
        fullname: {
            value: '',
            isValid: false
        },
        username: {
            value: '',
            isValid: false
        },
        phone: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const authContext = useContext(AuthContext);

    const registerNewUser = (e) => {
        e.preventDefault()
        const newUser = {
            name: formState.inputs.fullname.value,
            username: formState.inputs.username.value,
            phone: formState.inputs.phone.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.password.value,
        }

        apiRequests.post('auth/register', newUser)
            .then(res => {
                console.log(res.data);
                authContext.login(res.data.accessToken, res.data.user)
            })

        // fetch('http://localhost:4000/v1/auth/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newUser)
        // })
        //     .then(res => res.json())
        //     .then(data => console.log(data))
    }

    return (
        <>
            <Header />

            <section className="login-register">
                <div className="login register-form">
                    <span className="login__title">ساخت حساب کاربری</span>
                    <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
                    <div className="login__new-member">
                        <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
                        <Link className="login__new-member-link" to="/login">
                            وارد شوید
                        </Link>
                    </div>
                    <form action="#" className="login-form" onSubmit={registerNewUser}>
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                id='fullname'
                                onInputHandler={onInputHandler}
                                validators={[
                                    requiredValidator(),
                                    minValidator(4),
                                    maxValidator(20),
                                ]}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                placeholder="نام کاربری"
                                id='username'
                                onInputHandler={onInputHandler}
                                validators={[
                                    requiredValidator(),
                                    minValidator(4),
                                    maxValidator(20)
                                ]}
                            />
                            <i className="login-form__username-icon fa fa-id-card"></i>
                        </div>
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                placeholder="شماره موبایل"
                                id='phone'
                                onInputHandler={onInputHandler}
                                validators={[
                                    requiredValidator(),
                                    minValidator(4),
                                    maxValidator(20)
                                ]}
                            />
                            <i className="login-form__username-icon fa fa-phone"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                className="login-form__password-input"
                                type="text"
                                placeholder="آدرس ایمیل"
                                id='email'
                                onInputHandler={onInputHandler}
                                validators={[
                                    requiredValidator(),
                                    minValidator(5),
                                    maxValidator(20),
                                    emailValidator()
                                ]}
                            />
                            <i className="login-form__password-icon fa fa-envelope"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                className="login-form__password-input"
                                type="text"
                                placeholder="رمز عبور"
                                id='password'
                                onInputHandler={onInputHandler}
                                validators={[
                                    requiredValidator(),
                                    minValidator(3),
                                    maxValidator(20),
                                ]}
                            />
                            <i className="login-form__password-icon fa fa-lock-open"></i>
                        </div>
                        <button className={`login-form__btn ${formState.isFormValid ? '' : 'btn-disable'}`} type="submit" disabled={!formState.isFormValid}>
                            <i className="login-form__btn-icon fa fa-user-plus"></i>
                            <span className="login-form__btn-text">عضویت</span>
                        </button>
                    </form>
                    <div className="login__des">
                        <span className="login__des-title">سلام کاربر محترم:</span>
                        <ul className="login__des-list">
                            <li className="login__des-item">
                                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                                استفاده کنید.
                            </li>
                            <li className="login__des-item">
                                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
                            </li>
                            <li className="login__des-item">
                                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
