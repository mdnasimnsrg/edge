"use client";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function API() {
  return (
    <div className="bg-white p-2 rounded-md">
      <SwaggerUI url="http://169.63.176.109:8089/v1/apis/a1665f16-c86c-4c79-8b60-b74bdf884369/sandbox/openapi-definition/v0/openapi" />
    </div>
  );
}
