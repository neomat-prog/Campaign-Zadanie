import { useState, useEffect, useCallback } from "react";
import {
  initialCampaigns,
  initialEmeraldAccountBalance,
  availableTowns as mockAvailableTowns,
  prePopulatedKeywords as mockPrePopulatedKeywords,
} from "../data/mockCampaigns";

const generateUniqueId = () => String(Date.now());

const useCampaigns = () => {
  const [emeraldBalance, setEmeraldBalance] = useState(
    initialEmeraldAccountBalance
  );

  return {
    emeraldBalance,
  };
};

export default useCampaigns;
