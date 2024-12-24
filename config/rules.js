module.exports = [
  {
    name: "Valuation Fee Paid",
    condition: (data) => data.isValuationFeePaid === true,
  },
  {
    name: "UK Resident",
    condition: (data) => data.isUkResident === true,
  },
  {
    name: "Risk Rating Medium",
    condition: (data) => data.riskRating === "Medium",
  },
  {
    name: "LTV Below 60%",
    condition: (data) => {
      const loan = parseFloat(
        data.mortgage.loanRequired.replace(/[^\d.-]/g, "")
      );
      const purchasePrice = parseFloat(
        data.mortgage.purchasePrice.replace(/[^\d.-]/g, "")
      );
      const ltv = (loan / purchasePrice) * 100;
      return ltv < 60;
    },
  },
];
