interface RegistrationForm {
  username: string;
  personalAccessToken: string;
  token: string;
}

interface UpdateUserForm extends RegistrationForm {
  username?: string;
}

export { RegistrationForm, UpdateUserForm };
