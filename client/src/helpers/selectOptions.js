import React from "react";
import { Select } from "antd";

const { Option } = Select;

export const gender = [
  <Option value="MALE">Male</Option>,
  <Option value="FEMALE">Female</Option>,
  <Option value="OTHER">Other</Option>,
];

export const position = [
  <Option value="DEVELOPER">Developer</Option>,
  <Option value="MANAGER">Manager</Option>,
  <Option value="CLIENT">Client</Option>,
];

export const maritalStatus = [
  <Option value="SINGLE">Single</Option>,
  <Option value="MARRIED">Married</Option>,
  <Option value="DIVORCED">Divorced</Option>,
  <Option value="WIDOWED">Widowed</Option>,
];
