import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Products from "../products/products";
import { useSelector, useDispatch } from "react-redux";
import { FetchProductsLIst } from "../../store/actions/product-actions";
import MainForm from "../../form-edit/main-form";
import { LinkedIn, LinkedInPopUp } from "react-linkedin-login-oauth2";
import QueryString from "query-string";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";

const Home = () => {
  // using the filterd state for search product
  const moveProductList = useDispatch();
  const reduxStore = useSelector((state) => state.products);
  const { filtered } = reduxStore;
  const params = QueryString.parse(window.location.search);
  const [state, setstate] = useState({
    code: "",
    errorMessage: "",
  });

  const clientId = "7860yb5zz8zzqr";
  const client_secret = "S3ZbQ8H2QmlZuJOa";

  // action funtions
  useEffect(() => {
    moveProductList(FetchProductsLIst());
  }, [reduxStore.ProductsData]);

  const handleSuccess = (data) => {
    setstate({ code: data.code, errorMessage: "" });
  };

  const handleFailure = (error) => {
    setstate({
      code: "",
      errorMessage: error.errorMessage,
    });
  };

  const getEmailAddress = async (access_token) => {
    fetch(
      "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const linkedinLogin = async (code) => {
    console.log(code, "code");
    let data = `grant_type=authorization_code&code=${code}&redirect_uri=${window.location.origin}&client_id=${clientId}&client_secret=${client_secret}`;

    fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => getEmailAddress(res?.access_token))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(state?.code?.length > 0);
    if (state?.code?.length > 0) linkedinLogin(state?.code);
  }, [state]);

  if (params.code || params.error) {
    return <LinkedInPopUp />;
  }
  return (
    <div>
      {/* <MainForm /> */}
      <LinkedIn
        clientId={clientId}
        onFailure={handleFailure}
        onSuccess={handleSuccess}
        redirectUri={window.location.origin}
      >
        <img
          src={linkedin}
          alt="Log in with Linked In"
          style={{ maxWidth: "180px" }}
        />
      </LinkedIn>
      {!state.code && <div>No code</div>}
      {state.code && <div>Code: {state.code}</div>}
      {state.errorMessage && <div>{state.errorMessage}</div>}
      <Container>
        <Row>
          {/* {filtered
            ? filtered.map((v) => {
                return (
                  <Col
                    md={v.not_found ? null : 6}
                    key={v.id}
                    lg={v.not_found ? null : 4}
                  >
                    <Products
                      linkId={v.id}
                      title={v.title}
                      discription={v.body}
                      not_found={v.not_found}
                      price={v.price}
                    />
                  </Col>
                );
              })
            : "Loding..."} */}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
