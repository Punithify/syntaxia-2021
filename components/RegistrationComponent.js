import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MultiSelect from "react-multi-select-component";
import { Button, Row, Col, Alert } from "reactstrap";
import axios from "axios";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import ReCAPTCHA from "react-google-recaptcha";
import Notice from "../components/Notice";
import EventTable from "../components/EventTable";

const fetcher = async () => {
  const res = await axios
    .get("/api/events")
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return res;
};

export async function getStaticProps() {
  const res = await fetcher("/api/events");
  return { props: { res } };
}

const RegistrationComponent = ({ res }) => {
  const [selected, setSelected] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState(null);
  const recaptchaRef = React.createRef();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const { data } = useSWR("/api/events", fetcher, {
    initialData: res,
    refreshInterval: 1000,
  });
  const events = data ? Object.values(data[0].data) : [];

  const setOptions = () => {
    const options = events.filter((singleEvent) => singleEvent.seats > 0);
    return options.length > 0 ? options : [];
  };

  const showGroupField = () => {
    let result = false;
    selected.map((select) => {
      if (
        select.value === "CALL_OF_DUTY_MOBILE" ||
        select.value === "CAPTURE_THE_FLAG" ||
        select.value === "VALORANT" ||
        select.value === "CYPHER" ||
        select.value === "WEB_EYE" ||
        select.value === "TECH_TALK"
      ) {
        result = true;
        return;
      }
    });
    return result;
  };

  const loadRazorpay = () => {
    if (window.razorpay) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  };

  const displayRazorpay = async (event, values) => {
    if (disabled) {
      return;
    }
    const recaptchaValue = recaptchaRef.current.getValue();
    recaptchaRef.current.reset();

    if (!recaptchaValue) {
      return toast.error("ReCAPTCHA required", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const verify = await axios
      .post("/api/auth", {
        recaptchaValue,
      })
      .then((response) => response.data)
      .catch((err) => console.log(err));
    if (verify.success) {
      setDisabled(true);

      //generate a order
      const data = await axios
        .post(`/api/razorpay`)
        .then((response) => response.data)
        .catch(function (error) {
          console.log(error);
        });

      //razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: "St Joseph's College",
        description: " 2021",
        order_id: data.id,
        image: "",
        handler: function (response) {
          form.reset();
          setSelected([]);
          return toast.success("Payment Successful", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        prefill: {
          name: values.name,
          email: "",
          contact: "",
        },
        notes: {
          eventNames: `${selected.map((select) => select.value)}`,
          college: values.collegeName,
          studentName: values.name,
          groupName: values.groupName,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        return toast.error(
          `Payment Failed,due to:${response.reason} for ${payment_id} `,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
      paymentObject.open();
      setDisabled(false);
    }
  };
  const handleInvalidSubmit = () => {
    return toast.error("All fields are required", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const cancelSubmit = () => {
    form && form.reset();
    setSelected([]);
  };
  const scrollRef = useRef(null);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  useEffect(() => {
    loadRazorpay();
    if (isMobile) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div ref={scrollRef} className="container">
        <Notice />
        <Row className=" w-60 h-30 mx-auto mt-4">
          <Col sm={{ size: 6, order: 2, offset: 1 }}>
            <AvForm
              ref={(c) => setForm(c)}
              onValidSubmit={displayRazorpay}
              onInvalidSubmit={handleInvalidSubmit}
            >
              <h3 className="text-center">Select Events</h3>
              <AvField
                name="name"
                label="Enter your Name"
                type="text"
                errorMessage="Please enter your name"
                validate={{
                  required: { value: true },
                  pattern: { value: "^[A-Za-z]" },
                  minLength: { value: 4 },
                }}
              />
              <AvField
                name="collegeName"
                label="Enter your college name"
                type="text"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Please enter your college name",
                  },
                  pattern: {
                    value: "^[A-Za-z]",
                    errorMessage:
                      "College name must be composed only with letter",
                  },
                  minLength: {
                    value: 4,
                    errorMessage: "College name must have 4 or more characters",
                  },
                }}
              />
              {selected.length > 0 && (
                <Alert color="secondary">
                  Number of events selected : <b>{selected.length}</b>
                </Alert>
              )}
              <pre>{JSON.stringify(selected.label)}</pre>

              <MultiSelect
                options={() => setOptions()}
                value={selected}
                onChange={setSelected}
                labelledBy="Select events"
                className="mb-4"
              />
              {showGroupField() && (
                <AvField
                  name="groupName"
                  label="Enter your group name"
                  type="text"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "Please enter your group name",
                    },
                    pattern: {
                      value: "^[A-Za-z]",
                      errorMessage:
                        "group name must be composed only with letter",
                    },
                    minLength: {
                      value: 4,
                      errorMessage: "group name must have 4 or more characters",
                    },
                  }}
                />
              )}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onErrored={() =>
                  alert(
                    "Cannot contact reCAPTCHA. Check your connection and try again."
                  )
                }
              />
              {selected.length > 0 && (
                <Button
                  className="mr-4 mt-2 mb-4"
                  color="primary"
                  disabled={disabled}
                >
                  Pay Now
                </Button>
              )}
              <Button
                color="danger"
                className="ml-8 mt-2 mb-4"
                onClick={cancelSubmit}
              >
                cancel
              </Button>
            </AvForm>
          </Col>

          <Col className="mb-4">
            <h3 className="text-center">Events List</h3>
            <EventTable events={events} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RegistrationComponent;
