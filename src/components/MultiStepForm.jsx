import { useState } from "react";

export default function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "",
    pickupDate: "",
    pickupHour: "",
    pickupMinute: "",
    pickupLocation: "",
    dropoffLocation: "",
    flightNumber: "",
    passengers: "",
    luggage: "",
  });

  const serviceTypes = ["Standard", "Business", "VIP"];
  const locations = ["Baku Airport", "City Center", "Hotel XYZ"];

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 00,05,10...

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (activeStep < 4) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  // Step 1 validasiyası
  const isStep1Valid =
    formData.serviceType &&
    formData.pickupDate &&
    formData.pickupHour &&
    formData.pickupMinute !== "" &&
    formData.pickupLocation &&
    formData.dropoffLocation &&
    formData.flightNumber;

  // Step 2 validasiyası
  const isStep2Valid = formData.passengers && formData.luggage;

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <ul>
        <li className={activeStep === 1 ? "form-step active" : "form-step"}>1</li>
        <li className={activeStep === 2 ? "form-step active" : "form-step"}>2</li>
        <li className={activeStep === 3 ? "form-step active" : "form-step"}>3</li>
        <li className={activeStep === 4 ? "form-step active" : "form-step"}>4</li>
        </ul>
      <h2>Step {activeStep} of 4</h2>

      {/* Step 1 */}
      {activeStep === 1 && (
        <div>
          <label>Service Type:</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            {serviceTypes.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          <br />

          <label>Pickup Date:</label>
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
          />

          <br />

          <label>Pickup Time:</label>
          <select
            name="pickupHour"
            value={formData.pickupHour}
            onChange={handleChange}
          >
            <option value="">Hour</option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h.toString().padStart(2, "0")}
              </option>
            ))}
          </select>

          <select
            name="pickupMinute"
            value={formData.pickupMinute}
            onChange={handleChange}
          >
            <option value="">Minute</option>
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m.toString().padStart(2, "0")}
              </option>
            ))}
          </select>

          <br />

          <label>Pickup Location:</label>
          <select
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <br />

          <label>Drop-off Location:</label>
          <select
            name="dropoffLocation"
            value={formData.dropoffLocation}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <br />

          <label>Flight Number:</label>
          <input
            type="text"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
          />

          <br />
          <button onClick={handleNext} disabled={!isStep1Valid}>
            Next
          </button>
        </div>
      )}

      {/* Step 2 */}
      {activeStep === 2 && (
        <div>
          <label>Number of Passengers:</label>
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
          />

          <br />

          <label>Number of Luggage:</label>
          <input
            type="number"
            name="luggage"
            value={formData.luggage}
            onChange={handleChange}
          />

          <br />
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext} disabled={!isStep2Valid}>
            Next
          </button>
        </div>
      )}

      {/* Step 3 */}
      {activeStep === 3 && (
        <div>
          <p>Step 3 content (to be added later)</p>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {/* Step 4 */}
      {activeStep === 4 && (
        <div>
          <p>Step 4 content (to be added later)</p>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={() => alert("Form submitted!")}>Submit</button>
        </div>
      )}
    </div>
  );
}
