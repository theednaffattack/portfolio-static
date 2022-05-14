function ContactForm() {
  return (
    <form
      id="contact-form"
      name="contact-form"
      className="formStyles"
      method="post"
    >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="contact-form__input"
          type="text"
          id="name"
          name="name"
          size={30}
          maxLength={60}
        />

        <span className="contact-form__input-error" data-for="name"></span>
        <div className="hint-container">
          <p className="hidden" id="nameHint">
            Your name cannot contain punctuation
          </p>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          className="contact-form__input"
          type="email"
          id="email"
          name="email"
          size={30}
          maxLength={60}
        />

        <span className="contact-form__input-error" data-for="email"></span>
        <div className="hint-container">
          <p className="hidden email-hint">
            Please enter a valid email address
          </p>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          className="contact-form_input"
          name="message"
          id="message"
          cols={30}
          rows={10}
        ></textarea>

        <span
          aria-live="assertive"
          className="contact-form__input-error"
          data-for="message"
        ></span>
        <div className="hint-container">
          <p id="message-hint" className="hidden">
            Please enter a message
          </p>
        </div>
      </div>
      <div aria-live="assertive" id="error-message"></div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
