import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "cogo-toast";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { registerUser } from "../../helpers/api";
import { RegisterUser } from "../../types/register";

function RegisterContent() {
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    let search = qs.parse(location.search) as { token?: string };

    function onSubmit(data: { username: string; personalAccessToken: string }) {
        if (search.token) {
            setLoading(true);

            const regData: RegisterUser = {
                token: search.token,
                personalAccessToken: data.personalAccessToken,
                username: data.username,
            };

            registerUser(regData)
                .then(data => {
                    setLoading(false);

                    toast.success(data.message, {
                        position: "bottom-left",
                        hideAfter: 7,
                    });
                })
                .catch(err => {
                    setLoading(false);

                    toast.error(err.message, {
                        position: "bottom-left",
                        hideAfter: 7,
                    });
                });
        } else
            toast.error("Your registration url isn't valid!", {
                position: "bottom-left",
            });
    }

    useEffect(() => {
        if (!search.token)
            toast.warn(
                "Your registration url isn't valid, go and get a new registration url from our telegram bot.",
                { hideAfter: 3000, position: "bottom-left" }
            );
    }, [search.token]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        reValidateMode: "onChange",
    });

    return (
        <article>
            <form className="mb-0" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">GitHub username</label>
                <input
                    className="mb-0"
                    type="text"
                    placeholder="John-Due"
                    {...register("username", {
                        required: "GitHub username is required!",
                        minLength: {
                            message: "Minimum 2 letter required!",
                            value: 1,
                        },
                        maxLength: {
                            message: "Maximum 34 letters required!",
                            value: 34,
                        },
                    })}
                    aria-invalid={errors.username ? "true" : "spelling"}
                    autoComplete="off"
                />
                {errors.username && (
                    <small className="error-msg">
                        {errors.username.message}
                    </small>
                )}

                <label htmlFor="email">GitHub personal access token</label>
                <input
                    className="mb-0"
                    type="text"
                    placeholder="Personal access token"
                    {...register("personalAccessToken", {
                        required: "GitHub personal access token is required!",
                        minLength: {
                            message: "Minimum 8 letter required!",
                            value: 8,
                        },
                        maxLength: {
                            message: "Maximum 68 letters required!",
                            value: 68,
                        },
                    })}
                    aria-invalid={
                        errors && errors.personalAccessToken
                            ? "true"
                            : "spelling"
                    }
                    autoComplete="off"
                />
                {errors.personalAccessToken && (
                    <small className="error-msg">
                        {errors.personalAccessToken.message}
                    </small>
                )}

                <button type="submit" aria-busy={loading ? "true" : "false"}>
                    {loading ? "Please wait..." : "Submit"}
                </button>
            </form>
        </article>
    );
}

export default RegisterContent;
