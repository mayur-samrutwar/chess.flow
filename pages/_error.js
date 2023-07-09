import React from "react";
import Error from "next/error";

const CustomErrorPage = () => {
  // Hide the hydration error by returning null
  return null;
};

CustomErrorPage.getInitialProps = ({ res, err }) => {
  // Set the HTTP status code to 200 to prevent Next.js from showing the default error page
  if (res) {
    res.statusCode = 200;
  }
  return { err };
};

export default CustomErrorPage;
