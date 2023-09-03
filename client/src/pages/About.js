import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to <b>Al jannat Mall</b>, your ultimate online
            shopping destination. We bring you a world of choice and
            convenience, offering a diverse range of products from trusted
            brands. Our commitment to quality, community, and sustainability
            sets us apart. Join us in this shopping journey and experience the
            future of retail.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
