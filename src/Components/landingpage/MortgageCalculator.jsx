import React, { useState } from "react";

import "./MortgageCalculator.css"
export default function MortgageCalculator() {
    const [loanAmount, setLoanAmount] = useState(3703000);
    const [downPayment, setDownPayment] = useState(370300);
    const [loanPeriod, setLoanPeriod] = useState(5);
    const [interestRate, setInterestRate] = useState(4);
  
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency: "AED",
      }).format(value);
    };
  
    const calculateMonthlyPayment = () => {
      const loanAmountAfterDownPayment = loanAmount - downPayment;
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = loanPeriod * 12;
  
      const monthlyPayment =
        (loanAmountAfterDownPayment * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  
      return monthlyPayment.toFixed(2);
    };
  
    return (
      <div className="container">
        <h1>Mortgage Calculator</h1>
        <div className="calculator">
          <div className="input-section">
            <label htmlFor="loanAmount">Loan Amount (AED)</label>
            <input
              type="range"
              id="loanAmount"
              min="300000"
              max="50000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <span>{formatCurrency(loanAmount)}</span>
  
            <label htmlFor="downPayment">Down Payment (AED)</label>
            <input
              type="range"
              id="downPayment"
              min="0"
              max={loanAmount}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
            />
            <span>{formatCurrency(downPayment)}</span>
  
            <label htmlFor="loanPeriod">Loan Period (Years)</label>
            <input
              type="range"
              id="loanPeriod"
              min="3"
              max="30"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(Number(e.target.value))}
            />
            <span>{loanPeriod} years</span>
  
            <label htmlFor="interestRate">Interest Rate (%)</label>
            <input
              type="range"
              id="interestRate"
              min="2"
              max="15"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
            <span>{interestRate}%</span>
          </div>
  
          <div className="output-section">
            <h2>Monthly Payment</h2>
            <div id="monthlyPayment">{formatCurrency(calculateMonthlyPayment())} AED</div>
            <h3>
              Total Loan Amount:{" "}
              <span>{formatCurrency(loanAmount - downPayment)}</span>
            </h3>
            <h3>
              Interest: <span>{interestRate}%</span>
            </h3>
            <h3>
              Loan Period: <span>{loanPeriod} years</span>
            </h3>
            <button>Send Application</button>
          </div>
        </div>
      </div>
    );
  }
  