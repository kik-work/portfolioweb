"use client";

import type { FC } from "react";
import type { TabPageProps } from "@/components/TapContainer";
import HomePage from "./Homepage";

const Welcome: FC<TabPageProps> = ({ setActiveTab }) => {
  return <HomePage setActiveTab={setActiveTab} />;
};

export default Welcome;
