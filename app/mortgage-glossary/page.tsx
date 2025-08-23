"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search } from "lucide-react"

const glossaryTerms = [
  {
    term: "Agreement of Purchase and Sales",
    definition:
      "The legal contract a purchaser and a seller go into. We recommend that you have your offer prepared by a professional realtor that has the knowledge and experience to satisfactorily protect you with the most suitable clauses and conditions.",
  },
  {
    term: "Amortization Period",
    definition:
      "The number of years it takes to repay the entire amount of the financing based on a set of fixed payments.",
  },
  {
    term: "Appraisal",
    definition: "The process of determining the market value of a property.",
  },
  {
    term: "Assets",
    definition: "What you own or can call upon. Often used in determining net worth or in securing financing.",
  },
  {
    term: "Assumption Agreement",
    definition:
      "A legal document signed by a buyer that requires the buyer assume responsibility for the obligations of an existing mortgage. If someone assumes your mortgage, make sure that you get a release from the mortgage company to ensure that you are no longer liable for the debt.",
  },
  {
    term: "Blended Payments",
    definition:
      "Equal payments consisting of both an interest and a principal component. Typically, while the payment amount does not change, the principal portion increases, while the interest portion decreases.",
  },
  {
    term: "Canada Mortgage and Housing Corporation (CMHC)",
    definition:
      "CMHC is a federal Crown corporation that administers the National Housing Act (NHA). Among other services, they also insure mortgages for lenders that are greater than 80% of the purchase price or value of the home. The cost of that insurance is paid for by the borrower and is generally added to the mortgage amount. These mortgages are often referred to as 'Hi-Ratio' mortgages.",
  },
  {
    term: "Closed Mortgage",
    definition: "A mortgage that cannot be prepaid or renegotiated for a set period of time without penalties.",
  },
  {
    term: "Closing Date",
    definition: "The date on which the new owner takes possession of the property and the sale becomes final.",
  },
  {
    term: "Collateral",
    definition:
      "An asset, such as term deposit, Canada Savings Bond, or automobile, that you offer as security for a loan.",
  },
  {
    term: "Conventional Mortgage",
    definition:
      "A mortgage up to 80% of the purchase price or the value of the property. A mortgage exceeding 80% is referred to as a 'Hi-Ratio' mortgage and the lender will require insurance for that mortgage.",
  },
  {
    term: "Credit Scoring",
    definition:
      "A system that assesses a borrower on a number of items, assigning points that are used to determine the borrower's credit worthiness.",
  },
  {
    term: "Demand Loan",
    definition: "A loan where the balance must be repaid upon request.",
  },
  {
    term: "Deposit",
    definition:
      "A sum of money deposited in trust by the purchaser on making an offer to purchase. When the offer is accepted by the vendor (seller), the deposit is held in trust by the listing real estate broker, lawyer, or notary until the closing of the sale, at which point it is given to the vendor. If a house does not close because of the purchaser's failure to comply with the terms set out in the offer, the purchaser forgoes the deposit, and it is given to the vendor as compensation for the breaking of the contract (the offer).",
  },
  {
    term: "Equity",
    definition:
      "The difference between the market value of the property and any outstanding mortgages registered against the property. This difference belongs to the owner of that property.",
  },
  {
    term: "First Mortgage",
    definition: "A debt registered against a property that has first call on that property.",
  },
  {
    term: "Fixed-Rate Mortgage",
    definition: "A mortgage for which the interest is set for the term of the mortgage.",
  },
  {
    term: "Gross Debt Service Ratio (GDS)",
    definition:
      "It is one of the mathematical calculations used by lenders to determine a borrower's capacity to repay a mortgage. It takes into account the mortgage payments, property taxes, approximate heating costs, and 50% of any maintenance fees, and this sum is then divided by the gross income of the applicants. Ratios up to 32% are acceptable.",
  },
  {
    term: "Guarantor",
    definition:
      "A person with an established credit rating and sufficient earnings who guarantees to repay the loan for the borrower if the borrower does not.",
  },
  {
    term: "High-Ratio Mortgage",
    definition:
      "A mortgage that exceeds 80% of the purchase price or appraised value of the property. This type of mortgage must be insured. To avoid the cost of the insurance, a 1st mortgage up to 80% is arranged and a 2nd mortgage for the balance (up to 90% of the purchase price).",
  },
  {
    term: "Home Equity Line of Credit",
    definition:
      "A personal line of credit secured against the borrower's property. Generally, up to 75% of the purchase price or appraised value of the property is allowed to be borrowed with this product.",
  },
  {
    term: "Interest Adjustment Date (IAD)",
    definition:
      "The date on which the mortgage term will begin. This date is usually the first day of the month following the closing. The interest cost for those days from the closing date to the first of the month are usually paid at closing. That is why it is always better to close your deal towards the end of the month.",
  },
  {
    term: "Interest-Only Mortgage",
    definition:
      "A mortgage on which only the monthly interest cost is paid each month. The full principal remains outstanding. The payment is lower than an amortized mortgage since once is not paying any principal.",
  },
  {
    term: "Mortgage",
    definition:
      "A mortgage is a loan that uses a piece of real estate as a security. Once that loan is paid-off, the lender provides a discharge for that mortgage.",
  },
  {
    term: "Mortgagee",
    definition: "The financial institution or person (lender) who is lending the money using a mortgage.",
  },
  {
    term: "Mortgagor",
    definition: "The person who borrows the money using a mortgage.",
  },
  {
    term: "Open Mortgage",
    definition:
      "A mortgage that can be repaid at any time during the term without any penalty. For this convenience, the interest rate is between 0.75-1.00% higher than a closed mortgage. A good option if you are planning to sell your property or pay-off the mortgage entirely. *some conditions may apply",
  },
  {
    term: "P.I.T.",
    definition:
      "Principal, interest, and property tax due on a mortgage. If your down payment is greater than 25% of the purchase price or appraised value, the lender will allow you to make your own property tax payments.",
  },
  {
    term: "Portable Mortgage",
    definition:
      "An existing mortgage that can be transferred to a new property. One would want to port their mortgage in order to avoid any penalties, or if the interest rate is much lower than the current rates.",
  },
  {
    term: "Prepayment Penalty",
    definition:
      "A fee charged a borrower by the lender when the borrower prepays all or part of a mortgage over and above the amount agreed upon. Although there is no law as to how a lender can charge you the penalty, a usual charge is the greater of the Interest Rate Differential (IRD) or 3 months interest.",
  },
  {
    term: "Prime",
    definition: "The lowest rate a financial institution charges its best customers.",
  },
  {
    term: "Principal",
    definition: "The original amount of a loan, before interest.",
  },
  {
    term: "Rate Commitment",
    definition:
      "The number of days the lender will guarantee the mortgage rate on a mortgage approval. This can vary from lender to lender anywhere from 30 to 120 days.",
  },
  {
    term: "Refinance",
    definition:
      "Refers to the replacement of an existing debt obligation with a debt obligation under different terms. The most common consumer refinancing is for a home mortgage. If the replacement of debt occurs under financial distress, it is also referred to as debt restructuring. A loan (debt) can be refinanced for various reasons: 1.) to take advantage of a better interest rate (which will result in either a reduced monthly payment or a reduced term); 2.) to consolidate other debt(s) into one loan (this will result in a longer term); 3.) to reduce the monthly repayment amount (this will result in a longer term) 4.) to reduce or alter risk (e.g. changing from a variable-rate to a fixed-rate loan) 5.) to free up cash (this will result in a longer term). Breaking your mortgage contract to renew at a new rate and a new term, may include a prepayment charge to reimburse your financial institution for the lost interest income.",
  },
  {
    term: "Renewal",
    definition:
      "When the mortgage term has concluded, your mortgage is up for renewal. It is open at this time for prepayment in part or in full, then renew with same lender or transfer to another lender at no cost (we can arrange). When renewing your mortgage, the banks often only offer the posted rates. You have to push a little harder for them to give you a break. They know that most homeowners don't want to have to shop around, so, they offer you a higher rate and hope that you will take it.",
  },
  {
    term: "Second Mortgage",
    definition: "A debt registered against a property that is secured by a second charge on the property.",
  },
  {
    term: "Switch",
    definition:
      "To transfer an existing mortgage from one financial institution to another. We can have this arranged for you at no cost to you.",
  },
  {
    term: "Term",
    definition:
      "The period of time the financing agreement covers. The terms available are: 6 month, 1,2,3,4,5,6,7,10 year terms, and the interest rates will be fixed for whatever term once chooses.",
  },
  {
    term: "Total Debt Service (TDS) Ratio",
    definition:
      "It is the other mathematical calculations used by lenders to determine a borrower's capacity to repay a mortgage. It takes into account the mortgage payments, property taxes, approximate heating costs, and 50% of any maintenance fees, and any other monthly obligations (i.e. personal loans, car payments, lines of credit, credit card debts, other mortgages, etc.), and this sum is then divided by the gross income of the applicants. Ratios up to 40% are acceptable.",
  },
  {
    term: "Variable Rate Mortgage",
    definition:
      "A variable rate mortgage will fluctuate with the Lenders Prime rate throughout the mortgage term. While your regular payment will remain constant, your interest rate may change based on market conditions. This impacts the amount of principal you pay off each month. When rates on variable interest rate mortgages decrease, more of your regular payment is applied to your principal. Additionally if rates increase, more of your payment will go toward the interest. A variable rate mortgage typically offers more flexible terms than a fixed rate mortgage.",
  },
  {
    term: "Vendor Take Back (VTB) Mortgage",
    definition: "A mortgage provided by the vendor (seller) to the buyer.",
  },
]

export default function MortgageGlossary() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTerms = useMemo(() => {
    if (!searchTerm) return glossaryTerms

    return glossaryTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: typeof glossaryTerms } = {}

    filteredTerms.forEach((term) => {
      const firstLetter = term.term.charAt(0).toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(term)
    })

    // Sort each group alphabetically
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => a.term.localeCompare(b.term))
    })

    return groups
  }, [filteredTerms])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Mortgage Glossary</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Understanding mortgage terminology is essential for making informed decisions. Browse our comprehensive
            glossary of mortgage terms and definitions.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search terms or definitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          </div>

          {searchTerm && (
            <p className="mt-4 text-gray-600">
              Found {filteredTerms.length} term{filteredTerms.length !== 1 ? "s" : ""} matching "{searchTerm}"
            </p>
          )}
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {Object.keys(groupedTerms)
            .sort()
            .map((letter) => (
              <div key={letter} className="mb-12">
                <h2 className="text-3xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">{letter}</h2>
                <div className="space-y-6">
                  {groupedTerms[letter].map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <h3 className="text-xl font-bold text-black mb-3">{item.term}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No terms found matching "{searchTerm}"</p>
              <p className="text-gray-500 mt-2">Try searching with different keywords</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
