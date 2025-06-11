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

  const addCampaign = useCallback(
    (newCampaignData) => {
      if (emeraldBalance < newCampaignData.campaignFund) {
        alert("Brak wystarczających środków na koncie Emerald!");
        return false;
      }

      const newCampaign = {
        ...newCampaignData,
        id: generateUniqueId(),
      };
      setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
      setEmeraldBalance(
        (prevBalance) => prevBalance - newCampaign.campaignFund
      );
      return true;
    },
    [emeraldBalance]
  );

  const updateCampaign = useCallback(
    (updatedCampaign) => {
      let oldCampaignFund = 0;
      setCampaigns((prevCampaigns) => {
        const oldCampaign = prevCampaigns.find(
          (c) => c.id === updatedCampaign.id
        );
        if (oldCampaign) {
          oldCampaignFund = oldCampaign.campaignFund;
        }
        return prevCampaigns.map((camp) =>
          camp.id === updatedCampaign.id ? updatedCampaign : camp
        );
      });

      if (
        oldCampaignFund !== 0 &&
        oldCampaignFund !== updatedCampaign.campaignFund
      ) {
        const fundDifference = updatedCampaign.campaignFund - oldCampaignFund;

        if (fundDifference > 0 && emeraldBalance < fundDifference) {
          alert(
            `Brak wystarczających środków na zwiększenie funduszu. Potrzeba: ${fundDifference.toFixed(
              2
            )} PLN.`
          );
        } else {
          setEmeraldBalance((prevBalance) => prevBalance - fundDifference);
        }
      }

      setEditingCampaign(null);
    },
    [emeraldBalance]
  );

  const deleteCampaign = useCallback(
    (idToDelete) => {
      const campaignToDelete = campaigns.find((c) => c.id === idToDelete);
      if (campaignToDelete) {
        setCampaigns((prevCampaigns) =>
          prevCampaigns.filter((camp) => camp.id !== idToDelete)
        );
        setEmeraldBalance(
          (prevBalance) => prevBalance + campaignToDelete.campaignFund
        );
      }
    },
    [campaigns]
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
