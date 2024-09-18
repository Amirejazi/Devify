import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Input from "../../components/Form/Input";
import { requiredValidator, minValidator, maxValidator, emailValidator } from '../../validators/rules'
import "./Login.css";
import useForm from "../../hooks/useForm";
import apiRequests from "../../services/Axios/configs";
import AuthContext from "../../context/authContext";
import ReCAPTCHA from 'react-google-recaptcha';
import { successToast } from "../../services/HotToast/toast";
import toast from "react-hot-toast";

export default function Login() {
    const [formState, onInputHandler] = useForm({
        username: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false)
    let navigate = useNavigate()

    const authContext = useContext(AuthContext)

    const loginUser = (e) => {
        e.preventDefault()
        const userInfo = {
            identifier: formState.inputs.username.value,
            password: formState.inputs.password.value,
        }

        apiRequests.post('auth/login', userInfo)
            .then(res => {
                if (res.statusText !== 'OK') {
                    throw new Error(res.statusText)
                }
                authContext.login(res.data.user, res.data.accessToken)
                successToast('ورود با موفقیت انجام شد :)')
                // navigate('/')
            })
            .catch(err => {
                console.log(err.data);
                toast.error('همچین کاربری وجود ندارد')
            })
    }

    return (
        <>
            <Header />
            <section className="login-register">
                <div className="login">
                    <span className="login__title">ورود به حساب کاربری</span>
                    <span className="login__subtitle">
                        خوشحالیم دوباره میبینیمت دوست عزیز :)
                    </span>
                    <div className="login__new-member">
                        <span className="login__new-member-text">کاربر جدید هستید؟</span>
                        <Link className="login__new-member-link" to="/register">
                            ثبت نام
                        </Link>
                    </div>
                    <form action="#" className="login-form" onSubmit={loginUser}>
                        <div className="login-form__username">
                            <Input
                                id='username'
                                className="login-form__username-input"
                                type="text"
                                placeholder="نام کاربری یا آدرس ایمیل"
                                validators={[
                                    requiredValidator(),
                                    minValidator(4),
                                    maxValidator(20),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                id='password'
                                className="login-form__password-input"
                                type="text"
                                placeholder="رمز عبور"
                                validators={[
                                    requiredValidator(),
                                    minValidator(3),
                                    maxValidator(18),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__password-icon fa fa-lock-open"></i>
                        </div>
                        <br />
                        <div className="login-form__password">
                            <ReCAPTCHA
                                sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                                onChange={() => setIsRecaptchaVerified(true)}
                            />
                        </div>
                        <button className={`login-form__btn ${(formState.isFormValid && isRecaptchaVerified) ? '' : 'btn-disable'}`} type="submit" disabled={!formState.isFormValid}>
                            <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
                            <span className="login-form__btn-text">ورود</span>
                        </button>
                        <div className="login-form__password-setting">
                            <label className="login-form__password-remember">
                                <input className="login-form__password-checkbox" type="checkbox" />
                                <span className="login-form__password-text">
                                    مرا به خاطر داشته باش
                                </span>
                            </label>
                            <label className="login-form__password-forget">
                                <a className="login-form__password-forget-link" href="#">
                                    رمز عبور را فراموش کرده اید؟
                                </a>
                            </label>
                        </div>
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
