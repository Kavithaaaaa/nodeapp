import React from "react";

import { Breadcrumbs, Link } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { BreadCrumb } from "@/styles";

const useBreadCrumb = () => {
  const breadCrumb = (breadCrumbPath: any) => {
    return (
      <Breadcrumbs
        sx={{ marginLeft: "10px" }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {" "}
        {breadCrumbPath.map(
          (item: { name: string; url: string }, i: number) => {
            const arrayLength = breadCrumbPath.length;

            const indexNumber = i + 1;

            const c = arrayLength === indexNumber;

            return (
              <BreadCrumb key={item.name}>
                {" "}
                {!c ? (
                  <Link
                    underline="hover"
                    key={i}
                    color="inherit"
                    href={item.url}
                  >
                    {item.name}{" "}
                  </Link>
                ) : (
                  <span style={{ color: "" }}>{item.name}</span>
                )}{" "}
              </BreadCrumb>
            );
          }
        )}{" "}
      </Breadcrumbs>
    );
  };

  return {
    breadCrumb,
  };
};

export default useBreadCrumb;
