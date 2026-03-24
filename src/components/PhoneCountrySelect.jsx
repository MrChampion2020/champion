import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { PHONE_COUNTRIES } from "../data/phoneCountries";
import { getPhoneCountry } from "../utils/phoneValidation";

const PhoneCountrySelect = ({
  value,
  onChange,
  triggerClassName = "",
  ariaLabel = "Country code",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pickerRef = useRef(null);
  const searchInputRef = useRef(null);
  const selectedCountry = getPhoneCountry(value);
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredCountries = PHONE_COUNTRIES.filter((country) => {
    if (!normalizedSearchTerm) {
      return true;
    }

    return (
      country.name.toLowerCase().includes(normalizedSearchTerm) ||
      country.iso2.toLowerCase().includes(normalizedSearchTerm) ||
      country.dialCode.includes(normalizedSearchTerm.replace(/[^\d+]/g, ""))
    );
  });

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const focusTimer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((currentState) => {
      if (currentState) {
        setSearchTerm("");
      }

      return !currentState;
    });
  };

  const handleSelect = (countryIso2) => {
    onChange(countryIso2);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="phone-country-picker" ref={pickerRef}>
      <button
        type="button"
        className={`phone-country-trigger ${isOpen ? "phone-country-trigger--open" : ""} ${triggerClassName}`.trim()}
        onClick={handleToggle}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="phone-country-trigger-value">{selectedCountry?.dialCode}</span>
        <ChevronDown
          className={`phone-country-trigger-icon ${isOpen ? "phone-country-trigger-icon--open" : ""}`.trim()}
          size={16}
        />
      </button>
      {isOpen ? (
        <div className="phone-country-panel glass-card" role="dialog" aria-label="Country code selector">
          <div className="phone-country-search-shell">
            <Search className="phone-country-search-icon" size={16} />
            <input
              ref={searchInputRef}
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search country or code"
              className="phone-country-search-input"
            />
          </div>
          <div className="phone-country-options" role="listbox" aria-label="Country list">
            {filteredCountries.length ? (
              filteredCountries.map((country) => {
                const isSelected = country.iso2 === selectedCountry?.iso2;

                return (
                  <button
                    key={country.iso2}
                    type="button"
                    className={`phone-country-option ${isSelected ? "phone-country-option--selected" : ""}`.trim()}
                    onClick={() => handleSelect(country.iso2)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="phone-country-option-copy">
                      <span className="phone-country-option-name">{country.name}</span>
                      <span className="phone-country-option-meta">{country.iso2}</span>
                    </span>
                    <span className="phone-country-option-code-shell">
                      <span className="phone-country-option-code">{country.dialCode}</span>
                      {isSelected ? <Check size={16} className="phone-country-option-check" /> : null}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="phone-country-empty">No matching country code found.</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PhoneCountrySelect;
