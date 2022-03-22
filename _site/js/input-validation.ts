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

export function validateFormOnSubmit(
  formName: KeyThing,
  rules: Rule,
  errorElementClassName: string
) {
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

      const validationErrors = new Validation(rules).validate(formValues);

      const errorSpans = document.getElementsByClassName(errorElementClassName);

      for (const span of errorSpans) {
        if (span instanceof HTMLSpanElement) {
          // span is a HTMLSpanElement
          // span.style.display = "none";
          const fieldName = span.getAttribute("for");
          if (!fieldName) {
            throw new Error('The error field "for" attribute cannot be blank!');
          }
          const errorText = validationErrors[fieldName];

          // If there's no error text set innerText to nothing
          // This is useful only in repeat try / submit scenarios
          if (!errorText) {
            // throw new Error(
            //   "Validation error text is undefined. This is most likely due to a misconfigured rule!"
            // );

            span.innerText = "";
          }
          // If there is errorText, show it
          if (errorText) {
            span.innerText = errorText;
          }

          // span.innerHTML = `<label>${errorText}</label>`;
          // span.classList.add("contact-form__input-error");
        } else if (span instanceof SVGElement) {
          // span is a SVGElement
          const svgOwner = span.ownerSVGElement;
        } else {
          // span is a Element
          const baseUri = span.baseURI;
        }
      }
      // return new Validation(rules).validate(formValues);
    });
  }
}
