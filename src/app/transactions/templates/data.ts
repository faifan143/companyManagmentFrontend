export const templates = [
  {
    name: "Employee Leave Request",
    type: "internal",
    description: "Form to request employee leave approval.",
    departments: "67941e2227ca9719288fa43d",
    durationType: "days",
    duration: {
      start: "2025-02-08",
      end: "2025-02-28",
    },
    transactionFields: [
      {
        name: "Employee Name",
        type: "text",
        required: true,
      },
      {
        name: "Employee ID",
        type: "number",
        required: true,
      },
      {
        name: "Leave Type",
        type: "select",
        required: true,
      },
      {
        name: "Leave Start Date",
        type: "date",
        required: true,
      },
      {
        name: "Leave End Date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "Vendor Payment Request",
    type: "external",
    description: "Payment request form for external vendors.",
    departments: "67941e2227ca9719288fa43e",
    durationType: "weeks",
    duration: {
      start: "2025-03-01",
      end: "2025-03-15",
    },
    transactionFields: [
      {
        name: "Vendor Name",
        type: "text",
        required: true,
      },
      {
        name: "Invoice Number",
        type: "number",
        required: true,
      },
      {
        name: "Invoice Date",
        type: "date",
        required: true,
      },
      {
        name: "Amount",
        type: "number",
        required: true,
      },
      {
        name: "Payment Method",
        type: "select",
        required: false,
      },
    ],
  },
  {
    name: "Project Proposal Submission",
    type: "internal",
    description: "Form for submitting new project proposals.",
    departments: "67941e2227ca9719288fa43f",
    durationType: "months",
    duration: {
      start: "2025-04-01",
      end: "2025-06-30",
    },
    transactionFields: [
      {
        name: "Project Title",
        type: "text",
        required: true,
      },
      {
        name: "Project Manager",
        type: "text",
        required: true,
      },
      {
        name: "Budget",
        type: "number",
        required: true,
      },
      {
        name: "Start Date",
        type: "date",
        required: true,
      },
      {
        name: "End Date",
        type: "date",
        required: false,
      },
      {
        name: "Supporting Documents",
        type: "file",
        required: false,
      },
    ],
  },
];
