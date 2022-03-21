// Adapted from:
// https://gist.github.com/erikdstock/af2a99d89c695df22c085de59d8036c3

// currently this assumes every input is a string
export interface InputStrings {
  [everyProp: string]: string;
}

type ValidationRule = (val: string) => boolean;
type Errors<Inputs> = Partial<{ [P in keyof Inputs]: string }>;
export type Validator = (val: string) => string | void;
type MakeValidator = (msg?: string) => Validator;
type MakeValidatorWithArg = (arg: any, msg?: string) => Validator;

export type ValidationSchema<Inputs> = Partial<{
  [P in keyof Inputs]: Validator[];
}>;

export const composeValidator: (
  rule: ValidationRule,
  msg: string
) => Validator = (rule, msg) => (val) => {
  if (!rule(val)) {
    return msg;
  }
};

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// Rules
// const validateEmail: ValidationRule = (val) => val.indexOf("@") !== -1;
const validateEmail: ValidationRule = (val) =>
  val.match(emailFormat) ? true : false;
const validateRequired: ValidationRule = (val) => {
  if (typeof val === "string") {
    const returnValue: boolean = val.length > 0;
    return returnValue;
  }
  if (typeof val === "number") {
    return val > 0;
  }
  throw new Error(
    "The required validator can only accept number or string values!"
  );
};
const validateNumber: ValidationRule = (val) =>
  !Number.isNaN(Number.parseFloat(val));

const validateInt: ValidationRule = (val) => Number.isNaN(Number.parseInt(val));

const validateMinLength: (min: number) => ValidationRule = (min) => (val) =>
  val.length >= min;

// Validators from Functions
export const isRequired: MakeValidator = (message = "This field is required") =>
  composeValidator(validateRequired, message);
export const isEmail: MakeValidator = (msg = "Valid Email Required") =>
  composeValidator(validateEmail, msg);
export const isNumber: MakeValidator = (msg = "Must be a valid number") =>
  composeValidator(validateNumber, msg);
export const isInt: MakeValidator = (msg = "Integer Required") =>
  composeValidator(validateInt, msg);
export const isMinLength: MakeValidatorWithArg = (min, msg) =>
  composeValidator(validateMinLength(min), msg || `Min Length ${min} required`);

export class Validation<I extends InputStrings> {
  public schema: ValidationSchema<I>;
  constructor(schema: ValidationSchema<I>) {
    this.schema = schema;
  }

  validateField = (name: string, values: any) => "not implemented";

  validate: (inputs: I) => Errors<I> = (inputs) => {
    const reducedErrors = Object.keys(this.schema).reduce(
      (errors: Errors<I>, key) => {
        let errorMessage;
        const validators = this.schema[key];
        if (!validators) {
          throw new Error("Validators is undefined!");
        }
        const value = inputs[key];
        for (const i of Object.keys(validators)) {
          const validator = validators[i as any];
          const res = validator(value);
          if (res) {
            errorMessage = res;
            break;
          }
        }
        if (errorMessage) {
          console.log(errorMessage);
          errors[key as keyof I] = errorMessage;
        }
        return errors;
      },
      {}
    );

    return reducedErrors;
  };
}
