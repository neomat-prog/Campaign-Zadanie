import { useState, useEffect, useCallback } from "react";
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

  const addCampaign = useCallback(() => {}))

  const updateCampaign = useCallback(() => {})

  const deleteCampaign = useCallback(
  () => {}
  );

  const handleEdit = useCallback((campaign) => {
    setEditingCampaign(campaign);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingCampaign(null);
  }, []);

  return {
    campaigns,
    emeraldBalance,
    editingCampaign,
    availableTowns,
    prePopulatedKeywords,
    dataLoading,
    dataError,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    handleEdit,
    handleCancelEdit,
  };
};

export default useCampaigns;
