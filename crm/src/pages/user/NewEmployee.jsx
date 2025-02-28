import { Button } from "@/components/ui/button";
import { useState } from "react";

const EmployeeOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    startDate: "",
    salary: "",
    offerAccepted: false,
    ndaSigned: false,
    joiningConfirmed: false,
  });

  // HR-specific state
  const [isHRView, setIsHRView] = useState(true);
  const [offerLetterPdf, setOfferLetterPdf] = useState(null);
  const [ndaPdf, setNdaPdf] = useState(null);
  const [employeeSignature, setEmployeeSignature] = useState(null);
  const [signatureData, setSignatureData] = useState("");

  // Steps in the onboarding process
  const steps = [
    { id: "offer-letter", title: "Offer Letter" },
    { id: "nda", title: "Non-Disclosure Agreement" },
    { id: "joining-letter", title: "Joining Letter" },
    { id: "complete", title: "Onboarding Complete" },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle file upload for offer letter PDF
  const handleOfferLetterUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setOfferLetterPdf(file);
    } else {
      alert("Please upload a PDF file");
    }
  };

  // Handle file upload for NDA PDF
  const handleNdaUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setNdaPdf(file);
    } else {
      alert("Please upload a PDF file");
    }
  };

  // Handle signature creation
  const handleSignatureChange = (e) => {
    setSignatureData(e.target.value);
  };

  // Save the signature
  const saveSignature = () => {
    if (signatureData.trim()) {
      setEmployeeSignature(signatureData);
    } else {
      alert("Please provide a valid signature");
    }
  };

  // Navigate to next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Toggle between HR and Employee views
  const toggleView = () => {
    setIsHRView(!isHRView);
  };

  // Finalize and send offer to employee
  const sendOfferToEmployee = () => {
    if (!offerLetterPdf) {
      alert("Please upload an offer letter PDF");
      return;
    }

    setIsHRView(false);
    alert("Offer letter sent to employee!");
  };

  // Render the appropriate form based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Offer Letter
        if (isHRView) {
          // HR View for Offer Letter
          return (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Create Offer Letter (HR View)
                </h2>
              </div>

              <div className="space-y-4 p-4 rounded-md border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={userData.position}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={userData.department}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={userData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Salary
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={userData.salary}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Upload Offer Letter PDF
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleOfferLetterUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                  {offerLetterPdf && (
                    <div className="mt-2 text-sm text-green-600 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Uploaded: {offerLetterPdf.name}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Button
                    onClick={sendOfferToEmployee}
                    disabled={!offerLetterPdf}
                    className={`px-4 py-2 rounded-md ${
                      offerLetterPdf
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-300 cursor-not-allowed text-white"
                    }`}
                  >
                    Send Offer to Employee
                  </Button>
                </div>
              </div>
            </div>
          );
        } else {
          // Employee View for Offer Letter
          return (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Offer Letter</h2>
                {!userData.offerAccepted && (
                  <Button
                    onClick={toggleView}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Switch to HR View
                  </Button>
                )}
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold">
                      Offer Letter for {userData.name || "[Candidate Name]"}
                    </h3>
                    <p className="text-sm ">
                      Position: {userData.position || "[Position]"}
                    </p>
                  </div>
                  {offerLetterPdf && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Downloading PDF (simulated in this demo)");
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download PDF
                    </a>
                  )}
                </div>

                {offerLetterPdf ? (
                  <div className="border p-8 rounded flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-red-600 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="font-medium">{offerLetterPdf.name}</p>
                    <p className="text-sm text-gray-500 mt-1">PDF Document</p>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-gray-100 rounded">
                    <p className="text-gray-500">
                      No offer letter document available
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="offerAccepted"
                    name="offerAccepted"
                    checked={userData.offerAccepted}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="offerAccepted">
                    I have reviewed the offer letter and accept all terms and
                    conditions
                  </label>
                </div>
              </div>
            </div>
          );
        }

      case 1: // NDA
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Non-Disclosure Agreement</h2>

            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold">Non-Disclosure Agreement</h3>
                {ndaPdf && (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Downloading NDA PDF (simulated in this demo)");
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PDF
                  </a>
                )}
              </div>

              {isHRView ? (
                <div>
                  <div className="border-t pt-4 mt-4">
                    <label className="block text-sm font-medium mb-2">
                      Upload NDA PDF for Employee to Sign
                    </label>
                    <div className="flex items-center">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleNdaUpload}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
                    {ndaPdf && (
                      <div className="mt-2 text-sm text-green-600 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Uploaded: {ndaPdf.name}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={() => {
                        setIsHRView(false);
                        alert("NDA sent to employee for signing");
                      }}
                      disabled={!ndaPdf}
                      className={`px-4 py-2 rounded-md ${
                        ndaPdf
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-300 cursor-not-allowed text-white"
                      }`}
                    >
                      Send NDA to Employee
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {ndaPdf ? (
                    <div className="border p-8 rounded bg-gray-50 flex flex-col items-center justify-center mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-red-600 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="font-medium">{ndaPdf.name}</p>
                      <p className="text-sm text-gray-500 mt-1">PDF Document</p>
                    </div>
                  ) : (
                    <div className="text-center p-8 rounded mb-6">
                      <p className="text-gray-500">No NDA document available</p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">
                      Please sign below to agree to the NDA:
                    </h4>

                    {!employeeSignature ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Type your full name as signature:
                          </label>
                          <input
                            type="text"
                            value={signatureData}
                            onChange={handleSignatureChange}
                            placeholder="Type your full name here"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <Button
                          onClick={saveSignature}
                          disabled={!signatureData.trim()}
                          className={`px-4 py-2 rounded-md ${
                            signatureData.trim()
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-300 cursor-not-allowed text-white"
                          }`}
                        >
                          Sign Document
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <div className="border rounded-md p-4">
                          <p className="font-italic text-gray-700 mb-1">
                            Signed by:
                          </p>
                          <p className="font-medium text-lg font-signature">
                            {employeeSignature}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Date: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-4">
                          <Button
                            onClick={() =>
                              setUserData({ ...userData, ndaSigned: true })
                            }
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                          >
                            Confirm and Submit Signed NDA
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2: // Joining Letter
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Joining Letter</h2>
            <div className="p-4 border rounded-md">
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Joining Letter</h3>
                <p className="mb-4">Dear {userData.name},</p>
                <p className="mb-4">
                  We are delighted to welcome you to our company. This letter
                  confirms your employment with us as {userData.position} in the{" "}
                  {userData.department} department.
                </p>
                <p className="mb-4">
                  Your start date is confirmed as{" "}
                  {new Date(userData.startDate).toLocaleDateString()}. Please
                  arrive at our office at 9:00 AM, where a member of our HR team
                  will greet you and begin your orientation.
                </p>
                <p className="mb-4">
                  Please bring the following documents on your first day:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Photo ID</li>
                  <li>Social Security card</li>
                  <li>Banking information for direct deposit</li>
                  <li>Completed tax forms (W-4)</li>
                </ul>
                <p className="mb-4">
                  We look forward to having you join our team!
                </p>
                <p>
                  Sincerely,
                  <br />
                  HR Department
                </p>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="joiningConfirmed"
                    name="joiningConfirmed"
                    checked={userData.joiningConfirmed}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="joiningConfirmed">
                    I confirm receipt of this joining letter and will be present
                    on the start date
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Completion
        return (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Onboarding Complete!</h2>
            <p className="text-gray-600 mb-6">
              {userData.name}, all your documents have been successfully
              submitted.
            </p>
            <div className="p-4 border rounded-md text-left">
              <h3 className="font-bold text-lg mb-2">Next Steps:</h3>
              <ol className="list-decimal ml-6 space-y-2">
                <li>
                  Prepare for your first day on{" "}
                  {new Date(userData.startDate).toLocaleDateString()}
                </li>
                <li>Watch for an email with orientation details</li>
                <li>Complete any pending background checks</li>
                <li>Prepare your documents for day one</li>
              </ol>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Check if current step is completed to enable next button
  const isStepCompleted = () => {
    switch (currentStep) {
      case 0:
        return userData.offerAccepted;
      case 1:
        return userData.ndaSigned;
      case 2:
        return userData.joiningConfirmed;
      default:
        return true;
    }
  };

  return (
    <div className="w-full mx-auto p-6 rounded-lg shadow">
      {/* Admin toggle */}
      {currentStep !== 3 && (
        <div className="mb-4 flex justify-end">
          <Button
            onClick={toggleView}
            className="text-sm px-3 py-1 rounded-md flex items-center"
          >
            <span className="mr-1">{isHRView ? "Employee" : "HR"} View</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </Button>
        </div>
      )}

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index < currentStep
                    ? "bg-blue-600 text-white"
                    : index === currentStep
                    ? "bg-blue-100 border-2 border-blue-600 text-blue-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index < currentStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  currentStep === index
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className=" p-6 rounded-md">{renderStepContent()}</div>

      {/* Navigation buttons */}
      <div className="mt-6 flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          variant="outline"
          className={`px-4 py-2 rounded-md ${
            currentStep === 0 ? "cursor-not-allowed" : "hover:bg-gray-300"
          }`}
        >
          Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            onClick={handleNext}
            disabled={!isStepCompleted()}
            variant="outline"
            className={`px-4 py-2 rounded-md ${
              isStepCompleted()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-300 cursor-not-allowed text-white"
            }`}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={() => alert("Onboarding completed!")}
            className="px-4 py-2 rounded-md"
            variant="outline"
          >
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmployeeOnboarding;
