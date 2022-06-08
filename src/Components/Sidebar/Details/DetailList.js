import React from "react";

import "./DetailList.scss";

const detailData = [
  {
    id: 1,
    title: "Search",
    description: "Enter button should work as well",
  },
  {
    id: 2,
    title: "Add Movie",
    description: "This leads to new screen to add a new movie",
  },
  {
    id: 3,
    title: "Search button",
    description: "",
  },
  {
    id: 4,
    title: "Result Count",
    description: "",
  },
  {
    id: 5,
    title: "Result sort",
    description:
      '"release date" is selected by default. Click to switch option',
  },
  {
    id: 6,
    title: "Item image",
    description: "URL for the image you will get from the server",
  },
  {
    id: 7,
    title: "Item release data",
    description: "",
  },
  {
    id: 8,
    title: "Item genre",
    description: "",
  },
  {
    id: 9,
    title: "Item title",
    description: "",
  },
  {
    id: 10,
    title: "Result filter",
    description: "Filter the result by genre",
  },
  {
    id: 11,
    title: "Item context menu",
    description: "Visible against each card by hover",
  },
];

const DetailList = () => {
  return (
    <div className="container">
      <h1>Details</h1>
      <ol>
        {detailData.map((detail) => {
          return (
            <li key={detail.id}>
              <div className="title">{detail.title}</div>
              <div
                style={{ marginTop: `${detail.description ? "5px" : "-10px"}` }}
                className="description"
              >
                {detail.description}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default DetailList;
