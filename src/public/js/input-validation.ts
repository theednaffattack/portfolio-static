import {
  Validation,
  Validator,
  isRequired,
  isMinLength,
  isEmail,
} from "./basic-input-validation.js";

type KeyThing = keyof HTMLCollectionOf<HTMLFormElement>;

type Rule = {
  [key: string]: Validator[];
};

export function validateFormOnSubmit(formName: KeyThing, rules: Rule) {
  const forms = document.forms;

  const myForm = forms[formName];
  if (typeof myForm === "number") return;
  if ("addEventListener" in myForm) {
    myForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const ruleKeys: any[] = Object.keys(rules);
      let formValues: { [key: string]: any } = {};
      for (const key of ruleKeys) {
        formValues[key as any] = (<HTMLInputElement>(
          document.getElementById(key)
        )).value;
      }

      console.log("VIEW RULETHING, RULES:>>", {
        ruleThing: formValues,
        myForm,
      });

      return new Validation(rules).validate(formValues);
    });
  }
}

// const forms = document.forms;

// const formName: any = "contact-form";

// const myForm = forms[formName];
// const inputs = document.getElementsByClassName("contact-form__input");

// console.log("VIEW FORMS", { forms, myForm, inputs });
// const minLength = 13;

// const rules = {
//   name: [isRequired("Name is required")],
//   email: [isRequired("Email is required"), isEmail()],
//   message: [
//     isRequired("Message is required"),
//     isMinLength(
//       minLength,
//       `Your message must be at least ${minLength} characters long.`
//     ),
//   ],
// };

// const ruleKeys: any[] = Object.keys(rules);
// let ruleThing: { [key: string]: any } = {};
// for (const key of ruleKeys) {
//   ruleThing[key as any] = (<HTMLInputElement>(
//     document.getElementById(key)
//   )).value;
// }

// console.log("VIEW RULETHING, RULES:>>", { ruleThing });
// const result = new Validation(rules).validate({
//   name: "",
//   email: "omeone.com",
//   message: "blah",
// });
// console.log(result);
