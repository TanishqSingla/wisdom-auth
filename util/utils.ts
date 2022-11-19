export const isEmail = (value: string) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return regex.test(value);
}

export const isMobileNumber = (value: string) => {
  const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return regex.test(value)
}

export const inputErrors = {
  minPassword: "Password must be greater than 8 letters",
  noPassword: "Please enter passord",
  validPhNumber: "Please enter a valid mobile number",
  noEmailOrPhone: "Please enter email or mobile number",
  validEmail: "Please enter a valid email"
}