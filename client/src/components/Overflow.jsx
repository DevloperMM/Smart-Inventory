import React from "react";

function Overflow() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "auto",
          border: "1px solid #ccc",
        }}
      >
        <thead>
          <tr>
            {Array.from({ length: 12 }).map((_, index) => (
              <th
                key={index}
                style={{
                  border: "1px solid #ccc",
                  textAlign: "left",
                  padding: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                Column {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array.from({ length: 12 }).map((_, index) => (
              <td
                key={index}
                style={{
                  border: "1px solid #ccc",
                  textAlign: "left",
                  padding: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                Data {index + 1}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Overflow;
