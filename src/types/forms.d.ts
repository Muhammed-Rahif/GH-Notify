interface RegistrationForm {
    username: string;
    personalAccessToken: string;
    token: string;
}

interface UpdateUserForm extends RegistrationForm {
    // prevUsername: string;
}

export { RegistrationForm, UpdateUserForm };
