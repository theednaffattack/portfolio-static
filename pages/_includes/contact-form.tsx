export const frontMatter = {
  title: "Contact Form Dev",
  layout: "dev-layout.njk",
};

function ContactForm() {
  return (
    <form id="contact-form" name="contact-form" method="post">
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

      <label htmlFor="message">Message</label>
      <textarea
        className="contact-form__input"
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

      <button className="contact-form__button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
