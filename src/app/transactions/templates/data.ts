import { templateType } from "@/types/new-template.type";

export const templatesDummyData: templateType[] = [
  {
    _id: "1",
    name: "Equipment Purchase Request",
    type: "PURCHASE",
    description:
      "Request for purchasing new office equipment or hardware with multi-department approval flow",
    duration: {
      unit: "days",
      value: 5,
    },
    departments_approval_track: [
      "67941e2227ca9719288fa43d",
      "67941e4e27ca9719288fa453",
      "67a3cf6e27ca9719288fb04c",
    ],
    departments_execution_ids: [
      "67a3c07327ca9719288fae68",
      "67a3d3ac27ca9719288fb105",
    ],

    needAdminApproval: true,
    transactionFields: [
      { name: "Equipment Name", type: "text" },
      { name: "Quantity", type: "number" },
      { name: "Estimated Cost", type: "number" },
      { name: "Technical Specifications", type: "textarea" },
      { name: "Vendor Quote", type: "file" },
      { name: "Priority Level", type: "select" },
    ],
  },
  {
    _id: "2",
    name: "Leave Request",
    type: "HR",
    description:
      "Standard leave request form for employees with department manager approval",
    duration: {
      unit: "hours",
      value: 24,
    },
    departments_approval_track: [
      "67941e2227ca9719288fa43d",
      "67941e4e27ca9719288fa453",
      "67a3cf6e27ca9719288fb04c",
    ],
    departments_execution_ids: [
      "67a3c07327ca9719288fae68",
      "67a3d3ac27ca9719288fb105",
    ],
    needAdminApproval: false,
    transactionFields: [
      { name: "Leave Type", type: "select" },
      { name: "Start Date", type: "text" },
      { name: "End Date", type: "text" },
      { name: "Reason", type: "textarea" },
      { name: "Backup Contact", type: "text" },
    ],
  },
  {
    _id: "3",
    name: "Software License Request",
    type: "IT",
    description:
      "Request for new software licenses or subscriptions with IT and Finance approval",
    duration: {
      unit: "days",
      value: 3,
    },
    departments_approval_track: [
      "67941e2227ca9719288fa43d",
      "67941e4e27ca9719288fa453",
      "67a3cf6e27ca9719288fb04c",
    ],
    departments_execution_ids: [
      "67a3c07327ca9719288fae68",
      "67a3d3ac27ca9719288fb105",
    ],
    needAdminApproval: true,
    transactionFields: [
      { name: "Software Name", type: "text" },
      { name: "Number of Licenses", type: "number" },
      { name: "Business Justification", type: "textarea" },
      { name: "Preferred Vendor", type: "text" },
      { name: "Cost per License", type: "number" },
    ],
  },
  {
    _id: "4",
    name: "Travel Expense Claim",
    type: "FINANCE",
    description:
      "Submit travel-related expense claims with receipt attachments and manager approval",
    duration: {
      unit: "days",
      value: 7,
    },
    departments_approval_track: [
      "67941e2227ca9719288fa43d",
      "67941e4e27ca9719288fa453",
      "67a3cf6e27ca9719288fb04c",
    ],
    departments_execution_ids: [
      "67a3c07327ca9719288fae68",
      "67a3d3ac27ca9719288fb105",
    ],
    needAdminApproval: false,
    transactionFields: [
      { name: "Trip Purpose", type: "text" },
      { name: "Travel Dates", type: "text" },
      { name: "Total Amount", type: "number" },
      { name: "Receipts", type: "file" },
      { name: "Expense Category", type: "select" },
      { name: "Additional Notes", type: "textarea" },
    ],
  },
  {
    _id: "5",
    name: "Project Proposal",
    type: "MANAGEMENT",
    description:
      "Submit new project proposals for review and approval by management team",
    duration: {
      unit: "months",
      value: 1,
    },
    departments_approval_track: [
      "67941e2227ca9719288fa43d",
      "67941e4e27ca9719288fa453",
      "67a3cf6e27ca9719288fb04c",
    ],
    departments_execution_ids: [
      "67a3c07327ca9719288fae68",
      "67a3d3ac27ca9719288fb105",
    ],
    needAdminApproval: true,
    transactionFields: [
      { name: "Project Title", type: "text" },
      { name: "Project Scope", type: "textarea" },
      { name: "Estimated Budget", type: "number" },
      { name: "Timeline", type: "text" },
      { name: "Resource Requirements", type: "textarea" },
      { name: "Risk Assessment", type: "file" },
    ],
  },
  {
    _id: "6",
    name: "Maintenance Request",
    type: "FACILITIES",
    description:
      "Submit facility maintenance or repair requests for building services",
    duration: {
      unit: "days",
      value: 2,
    },
    departments_approval_track: [
      "67941e2227ca9719288fa43d",
      "67941e4e27ca9719288fa453",
      "67a3cf6e27ca9719288fb04c",
    ],
    departments_execution_ids: [
      "67a3c07327ca9719288fae68",
      "67a3d3ac27ca9719288fb105",
    ],
    needAdminApproval: false,
    transactionFields: [
      { name: "Location", type: "text" },
      { name: "Issue Type", type: "select" },
      { name: "Priority", type: "select" },
      { name: "Description", type: "textarea" },
      { name: "Photo of Issue", type: "file" },
    ],
  },
];
