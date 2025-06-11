import { useState, useCallback } from "react";
import {
  initialCampaigns,
  initialEmeraldAccountBalance,
  availableTowns as mockAvailableTowns,
  prePopulatedKeywords as mockPrePopulatedKeywords,
} from "../data/mockCampaigns";

const generateUniqueId = () => String(Date.now());

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [emeraldBalance, setEmeraldBalance] = useState(
    initialEmeraldAccountBalance
  );
  const [editingCampaign, setEditingCampaign] = useState(null);

  const [availableTowns, setAvailableTowns] = useState(mockAvailableTowns);
  const [prePopulatedKeywords, setPrePopulatedKeywords] = useState(
    mockPrePopulatedKeywords
  );
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState(null);


  return {
    emeraldBalance,
  }

};

export default useCampaigns;