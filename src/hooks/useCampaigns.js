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
  const [availableTowns] = useState(mockAvailableTowns);
  const [prePopulatedKeywords] = useState(mockPrePopulatedKeywords);
  const [dataLoading] = useState(false);
  const [dataError] = useState(null);



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
      let campaignFound = false;
      setCampaigns((prevCampaigns) => {
        const updatedPrevCampaigns = prevCampaigns.map((camp) => {
          if (camp.id === updatedCampaign.id) {
            oldCampaignFund = camp.campaignFund;
            campaignFound = true;
            return updatedCampaign;
          }
          return camp;
        });
        return updatedPrevCampaigns;
      });

      if (campaignFound && oldCampaignFund !== updatedCampaign.campaignFund) {
        const fundDifference = updatedCampaign.campaignFund - oldCampaignFund;

        if (fundDifference > 0 && emeraldBalance < fundDifference) {
          alert(
            `Brak wystarczających środków na zwiększenie funduszu. Potrzeba: ${fundDifference.toFixed(
              2
            )} PLN.`
          );
          return false;
        } else {
          setEmeraldBalance((prevBalance) => prevBalance - fundDifference);
        }
      }

      setEditingCampaign(null);
      return true;
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
