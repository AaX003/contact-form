import { useState } from 'react'
import '../css/App.css' // css file

function ContactForm() {
  const [fname, setFName] = useState(""); // first name
  const [lname, setLName] = useState(""); // last name
  const [email, setEmail] = useState(""); // email
  const [msg, setMsg] = useState(""); // message

  // success + error messages
  const [success, setSuccess] = useState(""); 
  const [error, setError] = useState("");

  // submission
  const HandleSubmit = async (e) => {
    e.preventDefault();

    // clears messages
    setSuccess("");
    setError("");

    // try...catch
    try {
      const response = await fetch("", { // **copy/paste your own form endpoint url here**
        method: "POST", // sends messages
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          email, 
          message: msg
        }),
      });

      // if...else
        if (response.ok) {
          setSuccess("Successful! Message delivered!");
          setFName("");
          setLName("");
          setEmail("");
          setMsg("");

          // adds a duration to messages
          setTimeout(() => {
            setSuccess("");
            setError("");
          }, 3000) 
        } else {
          setError("Something went wrong. Please try again.") // error display
        }
    } catch {
      setError("Network error. Please try again later.")
    }
  };

  return (

    <div className="main-container">
      {/* form container */}
      <section className="form-container">
        <form className="form" onSubmit={HandleSubmit}>
          <header className="form-header">
            <h1 className="title">Let's talk</h1>
          </header>

          {/* labels */}
          <label 
            htmlFor="fname"
            id="fname"
            className="fn-label">First Name</label>

            <input 
              id="fname"
              type="text"
              value={fname}
              onChange={(e) => setFName(e.target.value)}

              placeholder="First Name"
              required
              autoComplete="off"
            />

          <label 
            htmlFor="lname"
            id="lname"
            className="ln-label">Last Name</label>

            <input 
              id="lname"
              type="text"
              value={lname}
              onChange={(e) => setLName(e.target.value)}

              placeholder="Last Name"
              required
              autoComplete="off"
            />

          <label 
            htmlFor="email"
            id="email"
            className="email-label">Email</label>

            <input 
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              placeholder="Email"
              required
              autoComplete="off"
            />

          <label 
            htmlFor="msg"
            id="msg"
            className="msg-label">Message</label>

            <textarea 
              id="msg"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}

              placeholder="Type your message"
              required
              minLength={10}
              maxLength={100}
            />
            
            <button className="submit-btn" type="submit">Send Message</button>
        </form>
        
      </section>

      {/** messages */}
      {success && (
        <div className="backdrop">
          <div className="success-msg-wrapper">
            <p className="sucess-msg">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="err-msg-wrapper">
            <p className="error-msg">{error}</p>
          </div>
      )}
    </div>
  )
}

export default ContactForm
